export type TMachine = {
	id: number
	name: string
	vcpu: number
	ram: number
	storage: number
	pricePerHour: number
}

export type TAccountMachine = {
	id: number
	status: string
	totalUsageCost: number
	totalUsageHours: number
	machine: TMachine
}
