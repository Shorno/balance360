import {Link} from 'react-router';
import {Dumbbell, HomeIcon} from "lucide-react";

function NotFound() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8 relative">
                    <Dumbbell className="w-24 h-24 mx-auto text-purple-400/20 rotate-45"/>
                    <Dumbbell
                        className="w-24 h-24 mx-auto text-purple-400/20 -rotate-45 absolute top-0 left-1/2 -translate-x-1/2"/>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    4
                    <span
                        className="inline-block mx-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            0
          </span>
                    4
                </h1>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    Workout Not Found
                </h2>

                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Looks like this exercise routine doesn't exist. Don't worry, let's get you back to your fitness
                    journey.
                </p>

                {/* Action Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 hover:text-purple-300 transition-all duration-300"
                >
                    <HomeIcon className="w-5 h-5"/>
                    <span>Back to Homepage</span>
                </Link>

                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"/>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"/>
                </div>
            </div>
        </div>
    );
}

export default NotFound;