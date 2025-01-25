import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {
    FileText,
    Tag,
    Clock,
    BarChart,
    Layout,
    ImageIcon,
    Pencil,
    Trophy
} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import UploadAndPreviewPhoto from "@/components/UploadAndPreviewPhoto.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {forumSchema, ForumValues} from "@/schema/schema.ts";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useUserRole} from "@/hooks/useUserRole.ts";
import {Role} from "@/types";
import toast from "react-hot-toast";
import {postForum} from "@/api/forum.ts";

export interface ForumPost {
    title: string;
    content: string;
    category: string;
    image: string;
    tags: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedReadTime: string;
    role: string;
}

export default function ForumForm() {

    const role: Role = useUserRole();

    const form = useForm<ForumValues>({
        resolver: zodResolver(forumSchema),
        defaultValues: {
            title: '',
            content: '',
            category: '',
            image: '',
            tags: '',
            difficulty: 'Intermediate',
            estimatedReadTime: '',
            role: role,
        },
    });

    const {mutateAsync, isPending} = useMutation({
        mutationFn: postForum,
        onSuccess: () => {
            toast.success('Forum post created successfully');
            form.reset();
        },
        onError: (error) => {
            toast.error('An error occurred while creating the forum post');
            toast.error(error.message);
        }
    });

    const onSubmit = async (data: ForumValues) => {
        await mutateAsync(data);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-700">
                    <CardTitle
                        className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Create Fitness Post
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                        Share your fitness knowledge and expertise with the community
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <Pencil className="w-4 h-4 text-purple-400"/>
                                                Post Title
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., 10 Essential Stretches for Better Flexibility"
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Create an engaging title for your fitness post
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4 text-purple-400"/>
                                                Featured Image
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="h-[300px]">
                                                <UploadAndPreviewPhoto
                                                    onImageUpload={(url) => field.onChange(url)}
                                                    imageClassName="h-full w-full rounded-lg object-cover"
                                                    containerClassName="h-full"
                                                    previewClassName="h-full"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Upload an image that represents your fitness content
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-purple-400"/>
                                                Content
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Share your fitness tips, advice, and expertise..."
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white h-48 focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Write detailed, informative content about your fitness topic
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Layout className="w-4 h-4 text-purple-400"/>
                                                    Category
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Nutrition, Workout, Recovery"
                                                    {...field}
                                                    className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="w-4 h-4 text-purple-400"/>
                                                    Tags
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., #fitness #workout #health"
                                                    {...field}
                                                    className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="difficulty"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <BarChart className="w-4 h-4 text-purple-400"/>
                                                    Difficulty Level
                                                </div>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400">
                                                        <SelectValue placeholder="Select difficulty"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-gray-800 border-gray-600">
                                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="estimatedReadTime"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-purple-400"/>
                                                    Read Time
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., 5 mins"
                                                    {...field}
                                                    className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-700">
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className="w-full h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {isPending ? (
                                        <Trophy className="text-white animate-spin" size={24}/>
                                    ) : (
                                        "Publish Post"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}