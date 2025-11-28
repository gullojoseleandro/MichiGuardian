import { MainLayout } from "@/components/templates/MainLayout"
import { SignupForm } from "@/components/organisms/SignupForm"

export default function SignupPage() {
    return (
        <MainLayout>
            <div className="flex h-[calc(100vh-theme(spacing.14))] items-center justify-center py-12">
                <SignupForm />
            </div>
        </MainLayout>
    )
}
