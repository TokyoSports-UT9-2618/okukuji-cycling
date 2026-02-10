import Header from '@/components/Header';
import SpotsSection from '@/components/SpotsSection';
import Footer from '@/components/Footer';
import { client } from '@/lib/client';
import type { Spot } from '@/types';

export const metadata = {
    title: 'スポット情報 | 奥久慈街道サイクリング',
    description: '奥久慈街道周辺のサイクルスポット、グルメ、休憩所などをご紹介します。',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function SpotsPage() {
    let spots: Spot[] = [];

    try {
        const data = await client.get({
            endpoint: 'spots',
            queries: { limit: 100 }, // Fetch all spots (up to limit)
        });
        spots = data.contents;
    } catch (error) {
        console.error('Failed to fetch spots:', error);
    }

    // Determine sections or just list all?
    // User asked for "List page... all spots".

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                    {/* Reuse SpotsSection but hide header? Or just let it be. 
              SpotsSection has a hardcoded header. 
              Ideally I should add a prop to hide header or customize it.
              For now, I'll let it render. It has "CYCLING SPOTS" and description.
              Maybe I'll hide the page title I just added above and rely on SpotsSection's header?
              But SpotsSection header is "CYCLING SPOTS / スポット情報".
              Ideally for a dedicated page, "SPOT LIST" or "全スポット" is better.
              I will refrain from adding the h1 above and let SpotsSection handle it, OR I will modify SpotsSection to accept a title.
              Since I am already editing SpotsSection, I will add `title` prop.
           */}
                    <SpotsSection spots={spots} className="py-0" />
                </div>
            </main>
            <Footer />
        </>
    );
}
