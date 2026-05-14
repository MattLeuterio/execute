import { redirect } from 'next/navigation'

interface NutritionistRootPageProps {
  params: Promise<{ locale: string }>
}

export default async function NutritionistRootPage({ params }: NutritionistRootPageProps) {
  const { locale } = await params
  redirect(`/${locale}/nutritionist/dashboard`)
}
