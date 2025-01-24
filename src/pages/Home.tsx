import Hero from "@/components/home/Hero.tsx";
import FeaturesSection from "@/components/FeatureSection.tsx";
import {useUserRole} from "@/hooks/useUserRole.ts";
import {Role} from "@/types";
import NewsletterSection from "@/components/NewsLetterSection.tsx";


export default function Home() {
    const role: Role = useUserRole()
    console.log(role)
    return (
        <>
            <Hero/>
            <FeaturesSection/>
            <NewsletterSection/>
        </>
    )
}