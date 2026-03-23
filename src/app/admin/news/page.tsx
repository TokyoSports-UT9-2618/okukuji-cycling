'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Pin, Image as ImageIcon, Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const SERVICE_DOMAIN = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!;
const API_KEY = process.env.NEXT_PUBLIC_MICROCMS_API_KEY!;

type Category = 'イベント' | '交通・規制' | 'お知らせ' | 'メディア掲載';

const CATEGORIES: Category[] = ['イベント', '交通・規制', 'お知らせ', 'メディア掲載'];

interface ResizedImage {
    file: File;
    preview: string;
    originalName: string;
    originalSize: number;
    resizedSize: number;
}

// Canvas APIでリサイズ（最大1200px、WebP、画質80%）
async function resizeImage(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<File> {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            let { width, height } = img;
            const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    const resized = new File(
                        [blob!],
                        file.name.replace(/\.[^.]+$/, '.webp'),
                        { type: 'image/webp' }
                    );
                    resolve(resized);
                },
                'image/webp',
                quality
            );
        };
        img.src = url;
    });
}

// microCMS Media APIに画像アップロード → URLを返す
async function uploadToMicroCMS(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`https://${SERVICE_DOMAIN}.microcms-assets.io/api/v1/media`, {
        method: 'POST',
        headers: { 'X-MICROCMS-API-KEY': API_KEY },
        body: formData,
    });
    if (!res.ok) throw new Error(`画像アップロード失敗: ${res.status}`);
    const data = await res.json();
    return data.url as string;
}

export default function AdminNewsPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<Category>('お知らせ');
    const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
    const [content, setContent] = useState('');
    const [pinned, setPinned] = useState(false);
    const [eyecatchFile, setEyecatchFile] = useState<ResizedImage | null>(null);
    const [imageFiles, setImageFiles] = useState<ResizedImage[]>([]);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'posting' | 'done' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [postedId, setPostedId] = useState('');
    const eyecatchRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);

    const handleResizeAndPreview = async (files: FileList | null, target: 'eyecatch' | 'images') => {
        if (!files || files.length === 0) return;
        const arr = Array.from(files);

        if (target === 'images') {
            const remaining = 3 - imageFiles.length;
            if (remaining <= 0) return;
            const toProcess = arr.slice(0, remaining);
            const resized: ResizedImage[] = await Promise.all(
                toProcess.map(async (f) => {
                    const r = await resizeImage(f);
                    return {
                        file: r,
                        preview: URL.createObjectURL(r),
                        originalName: f.name,
                        originalSize: f.size,
                        resizedSize: r.size,
                    };
                })
            );
            setImageFiles((prev) => [...prev, ...resized]);
        } else {
            const f = arr[0];
            const r = await resizeImage(f);
            setEyecatchFile({
                file: r,
                preview: URL.createObjectURL(r),
                originalName: f.name,
                originalSize: f.size,
                resizedSize: r.size,
            });
        }
    };

    const removeImage = (index: number) => {
        setImageFiles((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async () => {
        if (!title.trim()) { setErrorMsg('タイトルを入力してください'); setStatus('error'); return; }
        if (!content.trim()) { setErrorMsg('本文を入力してください'); setStatus('error'); return; }

        setStatus('uploading');
        setErrorMsg('');

        try {
            // eyecatch アップロード
            let eyecatchUrl: string | undefined;
            if (eyecatchFile) {
                eyecatchUrl = await uploadToMicroCMS(eyecatchFile.file);
            }

            // images アップロード
            const imageUrls: string[] = [];
            for (const img of imageFiles) {
                const url = await uploadToMicroCMS(img.file);
                imageUrls.push(url);
            }

            setStatus('posting');

            // 記事POST
            const body: Record<string, unknown> = {
                title: title.trim(),
                category,
                publishDate: new Date(publishDate).toISOString(),
                content,
                pinned,
            };
            if (eyecatchUrl) {
                body.eyecatch = { url: eyecatchUrl };
            }
            if (imageUrls.length > 0) {
                body.images = imageUrls.map((url) => ({ url }));
            }

            const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`, {
                method: 'POST',
                headers: {
                    'X-MICROCMS-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`投稿失敗 (${res.status}): ${err}`);
            }

            const result = await res.json();
            setPostedId(result.id);
            setStatus('done');
        } catch (e: unknown) {
            setErrorMsg(e instanceof Error ? e.message : '不明なエラー');
            setStatus('error');
        }
    };

    const resetForm = () => {
        setTitle('');
        setCategory('お知らせ');
        setPublishDate(new Date().toISOString().split('T')[0]);
        setContent('');
        setPinned(false);
        setEyecatchFile(null);
        setImageFiles([]);
        setStatus('idle');
        setErrorMsg('');
        setPostedId('');
    };

    const formatBytes = (b: number) => b < 1024 * 1024
        ? `${(b / 1024).toFixed(0)}KB`
        : `${(b / 1024 / 1024).toFixed(1)}MB`;

    const isLoading = status === 'uploading' || status === 'posting';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ヘッダー */}
            <header className="bg-slate-900 text-white px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">管</div>
                <h1 className="font-bold text-lg">お知らせ投稿</h1>
                <span className="text-slate-400 text-sm ml-auto">奥久慈街道サイクリング</span>
            </header>

            <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

                {/* 完了状態 */}
                {status === 'done' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                        <p className="font-bold text-emerald-800 text-lg">投稿しました！</p>
                        <p className="text-sm text-emerald-700">記事ID: <code className="bg-emerald-100 px-2 py-0.5 rounded">{postedId}</code></p>
                        <div className="flex gap-3 justify-center mt-4">
                            <a
                                href={`/news/${postedId}`}
                                target="_blank"
                                className="px-5 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors"
                            >
                                記事を確認
                            </a>
                            <button
                                onClick={resetForm}
                                className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                続けて投稿
                            </button>
                        </div>
                    </div>
                )}

                {status !== 'done' && (
                    <>
                        {/* エラー */}
                        {status === 'error' && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{errorMsg}</p>
                            </div>
                        )}

                        {/* タイトル */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">タイトル <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="例：2024年春のサイクリングイベントを開催します"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                disabled={isLoading}
                            />
                        </div>

                        {/* カテゴリ・日付・固定 */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">カテゴリ</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value as Category)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                                        disabled={isLoading}
                                    >
                                        {CATEGORIES.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">公開日</label>
                                    <input
                                        type="date"
                                        value={publishDate}
                                        onChange={(e) => setPublishDate(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <div
                                    onClick={() => !isLoading && setPinned(!pinned)}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${pinned ? 'bg-amber-400' : 'bg-gray-200'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pinned ? 'translate-x-6' : 'translate-x-1'}`} />
                                </div>
                                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                    <Pin className="w-4 h-4 text-amber-500" />
                                    TOPページに固定する
                                </span>
                            </label>
                        </div>

                        {/* アイキャッチ（OGP用） */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">アイキャッチ画像</label>
                                <p className="text-xs text-gray-400 mt-0.5">OGP・SNSシェア時のサムネイルに使用（1枚）</p>
                            </div>
                            {eyecatchFile ? (
                                <div className="relative">
                                    <img src={eyecatchFile.preview} alt="eyecatch" className="w-full aspect-video object-cover rounded-lg" />
                                    <button
                                        onClick={() => { URL.revokeObjectURL(eyecatchFile.preview); setEyecatchFile(null); }}
                                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                                        disabled={isLoading}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {eyecatchFile.originalName} → {formatBytes(eyecatchFile.originalSize)} → {formatBytes(eyecatchFile.resizedSize)} (WebP)
                                    </p>
                                </div>
                            ) : (
                                <button
                                    onClick={() => eyecatchRef.current?.click()}
                                    className="w-full border-2 border-dashed border-gray-200 rounded-lg py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
                                    disabled={isLoading}
                                >
                                    <ImageIcon className="w-8 h-8" />
                                    <span className="text-sm">クリックして画像を選択</span>
                                    <span className="text-xs">自動でリサイズ・WebP変換されます</span>
                                </button>
                            )}
                            <input
                                ref={eyecatchRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleResizeAndPreview(e.target.files, 'eyecatch')}
                            />
                        </div>

                        {/* 記事画像（最大3枚） */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    記事画像
                                    <span className="ml-2 text-xs font-normal text-gray-400">{imageFiles.length}/3枚</span>
                                </label>
                                <p className="text-xs text-gray-400 mt-0.5">記事上部に表示（1枚→大きく、2〜3枚→タイル表示）</p>
                            </div>

                            {imageFiles.length > 0 && (
                                <div className={`grid gap-2 ${imageFiles.length === 1 ? 'grid-cols-1' : imageFiles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                    {imageFiles.map((img, i) => (
                                        <div key={i} className="relative group">
                                            <img
                                                src={img.preview}
                                                alt={`image${i + 1}`}
                                                className={`w-full object-cover rounded-lg ${imageFiles.length === 1 ? 'aspect-video' : 'aspect-square'}`}
                                            />
                                            <button
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                                disabled={isLoading}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            <p className="text-xs text-gray-400 mt-1 truncate">
                                                {formatBytes(img.resizedSize)} (WebP)
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {imageFiles.length < 3 && (
                                <button
                                    onClick={() => imagesRef.current?.click()}
                                    className="w-full border-2 border-dashed border-gray-200 rounded-lg py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
                                    disabled={isLoading}
                                >
                                    <Upload className="w-6 h-6" />
                                    <span className="text-sm">
                                        {imageFiles.length === 0 ? '画像を追加（最大3枚）' : `あと${3 - imageFiles.length}枚追加できます`}
                                    </span>
                                </button>
                            )}
                            <input
                                ref={imagesRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => handleResizeAndPreview(e.target.files, 'images')}
                            />
                        </div>

                        {/* 本文 */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">本文 <span className="text-red-500">*</span></label>
                            <p className="text-xs text-gray-400">HTMLタグが使えます（{'<b>'}太字{'</b>'}、{'<br>'}改行、{'<a href="...">'}リンク{'</a>'}など）</p>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={`例：\n2024年5月3日（金）に奥久慈街道サイクリングイベントを開催します。\n\n<b>開催日時</b>：2024年5月3日 9:00〜16:00\n<b>集合場所</b>：塙町中央公民館前`}
                                rows={10}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono resize-y"
                                disabled={isLoading}
                            />
                        </div>

                        {/* 投稿ボタン */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base shadow-sm"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {status === 'uploading' ? '画像をアップロード中...' : '記事を投稿中...'}
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    投稿する
                                </>
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
