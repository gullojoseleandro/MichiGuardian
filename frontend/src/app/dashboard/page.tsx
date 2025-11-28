import { MainLayout } from "@/components/templates/MainLayout"
import { Vault } from "@/components/organisms/Vault"

export default function DashboardPage() {
    return (
        <MainLayout>
            <div className="container mx-auto py-8 px-4">
                <Vault />
            </div>
        </MainLayout>
    )
}
