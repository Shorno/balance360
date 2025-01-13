import {ReactNode} from "react"
import {ThemeProvider} from "@/components/shared/theme-provider"

type Providers = {
    children: ReactNode
}

export default function Providers({children}: Providers) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}