import {useEffect} from "react";

export const SITE_TITLE = "Balance360"

export default function useDynamicTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | ${SITE_TITLE}`
    }, [title])

}