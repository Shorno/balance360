import { Activity, Target, Users, Award, ChevronRight } from 'lucide-react';

function AboutSection() {
    return (
        <section className="sm:py-32 py-10 bg-gray-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                                alt="Fitness training"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Stats Card */}
                        <div className="absolute -bottom-6 -right-6 bg-gray-800/95 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        15+
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">Expert Trainers</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        1.2k+
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">Active Members</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Transform Your Life Through
                                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Fitness Excellence
                                </span>
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                At FitSync Pro, we're more than just a fitness platform – we're your partner in transformation.
                                Founded in 2020, we've revolutionized the way people approach their fitness journey by combining
                                cutting-edge technology with personalized training experiences.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <Target className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            Personalized Approach
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Tailored fitness programs designed to meet your unique goals and preferences.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <Activity className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            Expert Guidance
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Learn from certified trainers with years of industry experience.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <Users className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            Supportive Community
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Join a vibrant community of fitness enthusiasts and like-minded individuals.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <Award className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            Proven Results
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Track your progress and celebrate achievements with our advanced tracking system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                            <span>Learn more about our mission</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;