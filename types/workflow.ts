import { LucideProps } from "lucide-react"
import { TaskParam, TaskType } from "./task"

export type WorkflowTask = {
    label: string 
    type :TaskType
    icon: React.FC<LucideProps>
    isEntryPoint?: boolean
    inputs: TaskParam[]
    outputs: TaskParam[]
    credits: number
}