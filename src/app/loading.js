import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 p-8">
        <Skeleton className='min-h-[630px] h-full w-full bg-zinc-300 mt-5' />
        {/* <Skeleton className='min-h-[630px] h-full w-full bg-zinc-300 mt-5' /> */}
    </div>
  )
}
export default Loading