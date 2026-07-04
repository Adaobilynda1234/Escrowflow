import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../../api/client'

const schema = z.object({
  bankAccountNumber: z.string().length(10, 'Must be 10 digits'),
  bankCode: z.string().length(3, 'Must be 3 characters'),
  bankName: z.string().min(2),
})
type FormData = z.infer<typeof schema>

export default function BankAccountPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    api.get('/profile/me').then(({ data }) => {
      if (data.bankAccountNumber) reset(data)
    })
  }, [reset])

  async function onSubmit(data: FormData) {
    await api.patch('/profile/bank', data)
    alert('Bank account saved!')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bank Account Details</h1>
      <p className="text-sm text-gray-500 mb-4">Add your bank account to receive milestone payouts.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Account Number (10 digits)</label>
          <input {...register('bankAccountNumber')} className="w-full border rounded-lg px-3 py-2" placeholder="0123456789" />
          {errors.bankAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.bankAccountNumber.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bank Code (3 chars, e.g. 058)</label>
          <input {...register('bankCode')} className="w-full border rounded-lg px-3 py-2" placeholder="058" />
          {errors.bankCode && <p className="text-red-500 text-xs mt-1">{errors.bankCode.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input {...register('bankName')} className="w-full border rounded-lg px-3 py-2" placeholder="Guaranty Trust Bank" />
          {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
          {isSubmitting ? 'Saving...' : 'Save Bank Account'}
        </button>
      </form>
    </div>
  )
}
