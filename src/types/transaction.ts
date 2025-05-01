import type { ETransactionType } from '@/enums/transaction-types'

export type TTransaction = {
	createdAt: Date
	type: ETransactionType
	value: number
}
