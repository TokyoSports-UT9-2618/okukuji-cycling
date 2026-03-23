'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Pin, Image as ImageIcon, Send, AlertCircle, CheckCircle2, Loader2, Plus, ChevronRight, Pencil, ArrowLeft } from 'lucide-react';

const SERVICE_DOMAIN = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!;
const API_KEY = process.env.NEXT_PUBLIC_MICROCMS_API_KEY!;

type Category = 'イベント' | '交通・規制' | 'お知らせ' | 'メディア掲載';
const CATEGORIES: Category[] = ['イベント', '交通・規制', 'お知らせ', 'メディア掲載'];

const categoryColors: Record<Category, string> = {
    イベント: 'bg-emerald-100 text-emerald-700',
    '交通・規制': 'bg-red-100 text-red-700',
    お知らせ: 'bg-blue-100 text-blue-700',
    メディア掲載: 'bg-purple-100 text-purple-700',
};

// 既存画像（microCMS上のURL）
interface ExistingImage { url: string; }
// 新規追加画像（ローカルファイル）
interface NewImage { file: File; preview: string; originalSize: number; resizedSize: number; }
type ImageItem = { kind: 'existing'; data: ExistingImage } | { kind: 'new'; data: NewImage };

interface NewsItem {
    id: string;
    title: string;
    category: Category;
    publishDate: string;
    publishedAt: string;
    pinned?: boolean;
    eyecatch?: { url: string };
    images?: { url: string }[];
    content: string;
}

// Canvas APIでリサイズ → WebP
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
            canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                resolve(new File([blob!], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
            }, 'image/webp', quality);
        };
        img.src = url;
    });
}

// microCMS Media APIに画像アップロード
async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`https://${SERVICE_DOMAIN}.microcms-assets.io/api/v1/media`, {
        method: 'POST',
        headers: { 'X-MICROCMS-API-KEY': API_KEY },
        body: formData,
    });
    if (!res.ok) throw new Error(`画像アップロード失敗: ${res.status}`);
    return (await res.json()).url as string;
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatBytes(b: number) {
    return b < 1024 * 1024 ? `${(b / 1024).toFixed(0)}KB` : `${(b / 1024 / 1024).toFixed(1)}MB`;
}

// ==================== 一覧ビュー ====================
function ListView({ onNew, onEdit }: { onNew: () => void; onEdit: (item: NewsItem) => void }) {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/news?limit=100&orders=-publishDate`, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY },
        })
            .then((r) => r.json())
            .then((data) => { setItems(data.contents || []); setLoading(false); })
            .catch(() => { setError('記事の読み込みに失敗しました'); setLoading(false); });
    }, []);

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">お知らせ一覧</h2>
                <button
                    onClick={onNew}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2.5 rounded-full transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    新規投稿
                </button>
            </div>

            {loading && (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />読み込み中...
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
            )}

            {!loading && !error && (
                <div className="space-y-3">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onEdit(item)}
                            className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all p-4 flex items-center gap-4 group"
                        >
                            {/* サムネイル */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                {(item.images?.[0]?.url || item.eyecatch?.url) ? (
                                    <img
                                        src={item.images?.[0]?.url || item.eyecatch?.url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-6 h-6 text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* テキスト */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                                        {item.category}
                                    </span>
                                    {item.pinned && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">📌 固定</span>}
                                </div>
                                <p className="font-medium text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">{item.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{formatDate(item.publishDate || item.publishedAt)}</p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Pencil className="w-3 h-3" />編集
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-400 transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ==================== 投稿・編集フォーム ====================
function NewsForm({ editItem, onBack }: { editItem: NewsItem | null; onBack: () => void }) {
    const isEdit = editItem !== null;

    const [title, setTitle] = useState(editItem?.title ?? '');
    const [category, setCategory] = useState<Category>(editItem?.category ?? 'お知らせ');
    const [publishDate, setPublishDate] = useState(
        editItem?.publishDate
            ? new Date(editItem.publishDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    );
    const [content, setContent] = useState(editItem?.content ?? '');
    const [pinned, setPinned] = useState(editItem?.pinned ?? false);

    // アイキャッチ（既存URL or 新規ファイル）
    const [eyecatchExisting, setEyecatchExisting] = useState<string | null>(editItem?.eyecatch?.url ?? null);
    const [eyecatchNew, setEyecatchNew] = useState<NewImage | null>(null);

    // 記事画像（既存 + 新規の混在）
    const [imageItems, setImageItems] = useState<ImageItem[]>(
        (editItem?.images ?? []).map((img) => ({ kind: 'existing', data: img }))
    );

    const [status, setStatus] = useState<'idle' | 'uploading' | 'posting' | 'done' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [postedId, setPostedId] = useState('');

    const eyecatchRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);

    const handleEyecatch = async (files: FileList | null) => {
        if (!files?.[0]) return;
        const resized = await resizeImage(files[0]);
        if (eyecatchNew) URL.revokeObjectURL(eyecatchNew.preview);
        setEyecatchNew({ file: resized, preview: URL.createObjectURL(resized), originalSize: files[0].size, resizedSize: resized.size });
        setEyecatchExisting(null);
    };

    const handleImages = async (files: FileList | null) => {
        if (!files) return;
        const remaining = 3 - imageItems.length;
        if (remaining <= 0) return;
        const toProcess = Array.from(files).slice(0, remaining);
        const resized: ImageItem[] = await Promise.all(
            toProcess.map(async (f) => {
                const r = await resizeImage(f);
                return { kind: 'new' as const, data: { file: r, preview: URL.createObjectURL(r), originalSize: f.size, resizedSize: r.size } };
            })
        );
        setImageItems((prev) => [...prev, ...resized]);
    };

    const removeImage = (index: number) => {
        setImageItems((prev) => {
            const item = prev[index];
            if (item.kind === 'new') URL.revokeObjectURL(item.data.preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async () => {
        if (!title.trim()) { setErrorMsg('タイトルを入力してください'); setStatus('error'); return; }
        if (!content.trim()) { setErrorMsg('本文を入力してください'); setStatus('error'); return; }

        setStatus('uploading');
        setErrorMsg('');

        try {
            // アイキャッチ
            let eyecatchUrl: string | undefined;
            if (eyecatchNew) {
                eyecatchUrl = await uploadImage(eyecatchNew.file);
            } else if (eyecatchExisting) {
                eyecatchUrl = eyecatchExisting;
            }

            // 記事画像（既存はURLそのまま、新規はアップロード）
            const imageUrls: string[] = [];
            for (const item of imageItems) {
                if (item.kind === 'existing') {
                    imageUrls.push(item.data.url);
                } else {
                    imageUrls.push(await uploadImage(item.data.file));
                }
            }

            setStatus('posting');

            const body: Record<string, unknown> = {
                title: title.trim(),
                category,
                publishDate: new Date(publishDate).toISOString(),
                content,
                pinned,
            };
            if (eyecatchUrl) body.eyecatch = { url: eyecatchUrl };
            body.images = imageUrls.map((url) => ({ url }));

            const url = isEdit
                ? `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news/${editItem!.id}`
                : `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;

            const res = await fetch(url, {
                method: isEdit ? 'PATCH' : 'POST',
                headers: { 'X-MICROCMS-API-KEY': API_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error(`失敗 (${res.status}): ${await res.text()}`);
            const result = await res.json();
            setPostedId(result.id || editItem?.id || '');
            setStatus('done');
        } catch (e: unknown) {
            setErrorMsg(e instanceof Error ? e.message : '不明なエラー');
            setStatus('error');
        }
    };

    const isLoading = status === 'uploading' || status === 'posting';
    const eyecatchSrc = eyecatchNew?.preview ?? eyecatchExisting ?? null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
            {/* 戻るボタン */}
            <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                一覧に戻る
            </button>

            <h2 className="text-xl font-bold text-gray-900">{isEdit ? '記事を編集' : '新規投稿'}</h2>

            {/* 完了 */}
            {status === 'done' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <p className="font-bold text-emerald-800 text-lg">{isEdit ? '更新しました！' : '投稿しました！'}</p>
                    <div className="flex gap-3 justify-center mt-4">
                        <a href={`/news/${postedId}`} target="_blank" className="px-5 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors">
                            記事を確認
                        </a>
                        <button onClick={onBack} className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                            一覧に戻る
                        </button>
                    </div>
                </div>
            )}

            {status !== 'done' && (
                <>
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
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            disabled={isLoading}
                        />
                    </div>

                    {/* カテゴリ・日付・固定 */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">カテゴリ</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white" disabled={isLoading}>
                                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">公開日</label>
                                <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" disabled={isLoading} />
                            </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <div onClick={() => !isLoading && setPinned(!pinned)} className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${pinned ? 'bg-amber-400' : 'bg-gray-200'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pinned ? 'translate-x-6' : 'translate-x-1'}`} />
                            </div>
                            <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                <Pin className="w-4 h-4 text-amber-500" />TOPページに固定する
                            </span>
                        </label>
                    </div>

                    {/* アイキャッチ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">アイキャッチ画像</label>
                            <p className="text-xs text-gray-400 mt-0.5">OGP・SNSシェア時のサムネイルに使用（1枚）</p>
                        </div>
                        {eyecatchSrc ? (
                            <div className="relative">
                                <img src={eyecatchSrc} alt="eyecatch" className="w-full aspect-video object-cover rounded-lg" />
                                <button
                                    onClick={() => { if (eyecatchNew) URL.revokeObjectURL(eyecatchNew.preview); setEyecatchNew(null); setEyecatchExisting(null); }}
                                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                                    disabled={isLoading}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                {eyecatchNew && (
                                    <p className="text-xs text-gray-400 mt-1">{formatBytes(eyecatchNew.originalSize)} → {formatBytes(eyecatchNew.resizedSize)} (WebP)</p>
                                )}
                                {eyecatchExisting && (
                                    <button onClick={() => eyecatchRef.current?.click()} className="mt-2 text-xs text-emerald-600 hover:underline" disabled={isLoading}>
                                        別の画像に差し替える
                                    </button>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => eyecatchRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 rounded-lg py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors" disabled={isLoading}>
                                <ImageIcon className="w-8 h-8" />
                                <span className="text-sm">クリックして画像を選択</span>
                                <span className="text-xs">自動でリサイズ・WebP変換されます</span>
                            </button>
                        )}
                        <input ref={eyecatchRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleEyecatch(e.target.files)} />
                    </div>

                    {/* 記事画像 */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                記事画像 <span className="ml-2 text-xs font-normal text-gray-400">{imageItems.length}/3枚</span>
                            </label>
                            <p className="text-xs text-gray-400 mt-0.5">記事上部に表示（1枚→大きく、2〜3枚→タイル表示）</p>
                        </div>

                        {imageItems.length > 0 && (
                            <div className={`grid gap-2 ${imageItems.length === 1 ? 'grid-cols-1' : imageItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                {imageItems.map((item, i) => {
                                    const src = item.kind === 'existing' ? item.data.url : item.data.preview;
                                    return (
                                        <div key={i} className="relative group">
                                            <img src={src} alt={`image${i + 1}`} className={`w-full object-cover rounded-lg ${imageItems.length === 1 ? 'aspect-video' : 'aspect-square'}`} />
                                            <button onClick={() => removeImage(i)} className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80" disabled={isLoading}>
                                                <X className="w-3 h-3" />
                                            </button>
                                            {item.kind === 'new' && (
                                                <p className="text-xs text-gray-400 mt-1 truncate">{formatBytes(item.data.resizedSize)} (WebP)</p>
                                            )}
                                            {item.kind === 'existing' && (
                                                <p className="text-xs text-gray-400 mt-1">既存画像</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {imageItems.length < 3 && (
                            <button onClick={() => imagesRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 rounded-lg py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors" disabled={isLoading}>
                                <Upload className="w-6 h-6" />
                                <span className="text-sm">{imageItems.length === 0 ? '画像を追加（最大3枚）' : `あと${3 - imageItems.length}枚追加できます`}</span>
                            </button>
                        )}
                        <input ref={imagesRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImages(e.target.files)} />
                    </div>

                    {/* 本文 */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">本文 <span className="text-red-500">*</span></label>
                        <p className="text-xs text-gray-400">HTMLタグが使えます（{'<b>'}太字{'</b>'}、{'<br>'}改行、{'<a href="...">'}リンク{'</a>'}など）</p>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono resize-y"
                            disabled={isLoading}
                        />
                    </div>

                    {/* 送信ボタン */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base shadow-sm"
                    >
                        {isLoading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" />{status === 'uploading' ? '画像をアップロード中...' : '送信中...'}</>
                        ) : (
                            <><Send className="w-5 h-5" />{isEdit ? '更新する' : '投稿する'}</>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}

// ==================== メインページ ====================
export default function AdminNewsPage() {
    const [view, setView] = useState<'list' | 'new' | 'edit'>('list');
    const [editItem, setEditItem] = useState<NewsItem | null>(null);

    const handleEdit = (item: NewsItem) => { setEditItem(item); setView('edit'); };
    const handleNew = () => { setEditItem(null); setView('new'); };
    const handleBack = () => { setEditItem(null); setView('list'); };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-slate-900 text-white px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">管</div>
                <h1 className="font-bold text-lg">お知らせ管理</h1>
                <span className="text-slate-400 text-sm ml-auto">奥久慈街道サイクリング</span>
            </header>

            {view === 'list' && <ListView onNew={handleNew} onEdit={handleEdit} />}
            {(view === 'new' || view === 'edit') && <NewsForm editItem={editItem} onBack={handleBack} />}
        </div>
    );
}
