import Hero from "@/components/home/Hero.tsx";
import FeaturesSection from "@/components/FeatureSection.tsx";
import NewsletterSection from "@/components/NewsLetterSection.tsx";
import AboutSection from "@/components/AboutSection.tsx";
import TestimonialSection from "@/components/TestimonialSection.tsx";
import TeamSection from "@/components/TeamSection.tsx";
import FeaturedClasses from "@/components/FeaturedClasses.tsx";
import LatestForumPosts from "@/components/LatestForumPosts.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";


export default function Home() {
    useDynamicTitle("Home")
    return (
        <>
            <Hero/>
            <FeaturesSection/>
            <AboutSection/>
            <FeaturedClasses/>
            <TestimonialSection/>
            <LatestForumPosts/>
            <NewsletterSection/>
            <TeamSection/>
        </>
    )
}