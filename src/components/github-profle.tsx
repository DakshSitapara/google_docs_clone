import { FaSquareGithub } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function GithubProfile() {

    const onClick = () => {
        window.open("https://github.com/DakshSitapara/google_docs_clone", "_blank")
    }

    return(
         <>
        <Separator orientation="vertical" className="h-6" />
            <Button
                onClick={onClick} 
                variant="ghost" 
                className="relative h-6 w-6 flex items-center justify-center rounded-md"
            >
            <Avatar className="h-6 w-6">
                <AvatarImage src="https://avatars.githubusercontent.com/u/9919?s=200&v=4" alt="@github" />
                    <AvatarFallback>
                        <FaSquareGithub />
                    </AvatarFallback>
            </Avatar>
                  </Button>
        </>
    )
}   