import { Activity, BarChart2, Users, Trophy } from 'lucide-react'
import {FeatureSteps} from "@/components/FeatureSteps.tsx";
import step1 from "@/assets/step1.webp";
import step2 from "@/assets/step2.webp";
import step3 from "@/assets/step3.jpg";
import step4 from "@/assets/step4.jpg";



const features = [
    {
        step: 'Step 1',
        title: 'Set Your Goals',
        content: 'Define your fitness objectives and create a personalized plan tailored to your needs.',
        image: step1,
        icon: Activity
    },
    {
        step: 'Step 2',
        title: 'Track Your Progress',
        content: 'Monitor your workouts, nutrition, and vital stats in real-time with our advanced tracking tools.',
        image: step2,
        icon: BarChart2
    },
    {
        step: 'Step 3',
        title: 'Join the Community',
        content: 'Connect with like-minded individuals, participate in challenges, and stay motivated together.',
        image: step3,
        icon: Users
    },
    {
        step: 'Step 4',
        title: 'Achieve Results',
        content: 'Reach your fitness goals with personalized insights, expert guidance, and continuous support.',
        image: step4,
        icon: Trophy
    },
]

export default function FeaturesSection() {
    return (
        <FeatureSteps
            features={features}
            title="Transform Your Fitness Journey"
            autoPlayInterval={5000}
            imageHeight="h-[624px]"
        />
    )
}

