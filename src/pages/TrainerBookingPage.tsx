import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, ChevronRight, Dumbbell, Shield, Sparkles, User, TimerIcon } from 'lucide-react';

interface MembershipPlan {
    id: string;
    name: string;
    price: number;
    icon: React.ElementType;
    features: string[];
    color: string;
}

const membershipPlans: MembershipPlan[] = [
    {
        id: 'basic',
        name: 'Basic Membership',
        price: 10,
        icon: Dumbbell,
        features: [
            'Access to gym facilities during regular operating hours',
            'Use of cardio and strength training equipment',
            'Access to locker rooms and showers'
        ],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'standard',
        name: 'Standard Membership',
        price: 50,
        icon: Shield,
        features: [
            'All benefits of the basic membership',
            'Access to group fitness classes such as yoga, spinning, and Zumba',
            'Use of additional amenities like a sauna or steam room'
        ],
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'premium',
        name: 'Premium Membership',
        price: 100,
        icon: Sparkles,
        features: [
            'All benefits of the standard membership',
            'Access to personal training sessions with certified trainers',
            'Discounts on additional services such as massage therapy or nutrition counseling'
        ],
        color: 'from-amber-500 to-orange-500'
    }
];

export default function TrainerBookingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const { state } = location;
    const slotInfo = state.slot;

    const plan: MembershipPlan | undefined = membershipPlans.find(plan => plan.id === selectedPlan);

    const handleJoinNow = () => {
        if (!selectedPlan) return;
        navigate('/trainers/book-trainer/payment', {
            state: {
                slotInfo,
                price: plan?.price,
                planName: plan?.name,
                trainerName: state.trainerName
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Book Your Training Session
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Choose your membership plan and start your fitness journey with {state.trainerName}
                    </p>
                </div>

                {/* Booking Info Card */}
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">Session Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <User className="w-6 h-6 text-purple-400"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Trainer</p>
                                <p className="text-white font-medium">{state.trainerName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-400"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Time Slot</p>
                                <p className="text-white font-medium">{slotInfo.startTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <TimerIcon className="w-6 h-6 text-purple-400"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Slot Duration</p>
                                <p className="text-white font-medium">{slotInfo.slotDuration}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Dumbbell className="w-6 h-6 text-purple-400"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Classes</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    <Badge
                                        className="bg-purple-500/20 hover:bg-purple-500/50 text-purple-300 border border-purple-500/30"
                                    >
                                        {slotInfo.selectedClass}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {membershipPlans.map((plan) => {
                        const Icon = plan.icon;
                        const isSelected = selectedPlan === plan.id;
                        return (
                            <Card
                                key={plan.id}
                                className={`bg-gray-800/50 border-2 transition-all duration-300 cursor-pointer ${
                                    isSelected
                                        ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                                        : 'border-gray-700 hover:border-gray-600'
                                }`}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                                            <p className="text-3xl font-bold text-white">
                                                ${plan.price}
                                                <span className="text-sm font-normal text-gray-400">/month</span>
                                            </p>
                                        </div>
                                        <div
                                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                                            <Icon className="w-6 h-6 text-white"/>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div
                                                    className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-purple-400"/>
                                                </div>
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={handleJoinNow}
                        disabled={!selectedPlan}
                        className={`h-12 px-8 text-lg font-semibold ${
                            selectedPlan
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                : 'bg-gray-700 cursor-not-allowed'
                        }`}
                    >
                        Join Now
                        <ChevronRight className="w-5 h-5 ml-2"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}