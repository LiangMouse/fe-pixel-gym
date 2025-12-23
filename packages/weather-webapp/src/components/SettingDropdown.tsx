import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDown, Settings } from "lucide-react"

const SettingDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-32 h-12 bg-neutral-800 flex items-center gap-2 rounded-2xl">
        <Settings color="white" className="mx-2" />
        <p className="text-amber-50">Units</p>
        <ArrowDown color="white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SettingDropdown