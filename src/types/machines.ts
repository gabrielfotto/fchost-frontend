export type TMachine = {
	id: number
	name: string
	vcpu: number
	ram: number
	pricePerHour: number
}

export type TAccountMachine = {
	id: number
	status: string
	machine: TMachine
}
