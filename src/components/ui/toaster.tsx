import { Toaster as Sonner } from "sonner"

const Toaster = () => (
  <Sonner
    closeButton
    expand={false}
    position="top-center"
    theme="dark"
    toastOptions={{
      classNames: {
        toast:
          "relative rounded-[22px] border border-white/10 bg-card/95 pr-12 text-card-foreground shadow-[0_24px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md",
        content: "gap-1",
        title: "text-sm font-semibold tracking-tight text-foreground",
        description: "text-[13px] leading-5 text-muted-foreground",
        icon: "text-primary",
        default: "[&_[data-icon]]:text-primary",
        success: "[&_[data-icon]]:text-primary",
        error: "[&_[data-icon]]:text-destructive",
        info: "[&_[data-icon]]:text-accent",
        warning: "[&_[data-icon]]:text-primary",
        loading: "[&_[data-icon]]:text-muted-foreground",
        closeButton:
          "!left-auto !right-3 !top-3 !transform-none !border-white/10 !bg-white/[0.04] !text-muted-foreground hover:!bg-white/[0.08] hover:!text-foreground",
        actionButton:
          "!rounded-xl !border-0 !bg-primary !text-primary-foreground hover:!brightness-105",
        cancelButton:
          "!rounded-xl !border !border-white/10 !bg-white/[0.03] !text-foreground hover:!bg-white/[0.06]",
      },
    }}
  />
)

export { Toaster }
