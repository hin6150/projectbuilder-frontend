import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputFormStyles from './InputForm.css'

interface InputFormProps {
  label: string
  id: string
  type: string
  placeholder: string
  disabled?: boolean
}

const InputForm = ({
  label,
  id,
  type,
  placeholder,
  disabled = false,
}: InputFormProps) => {
  return (
    <div className={InputFormStyles.container}>
      <Label htmlFor={id} className={InputFormStyles.label}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        className={`${InputFormStyles.input} ${InputFormStyles.placeholder}`}
      />
    </div>
  )
}

export default InputForm
