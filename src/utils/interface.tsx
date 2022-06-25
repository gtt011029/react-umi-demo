export interface testInterface {
  name: string
}

export interface testInterface {
  gender: string
}

export interface extendsInterface extends testInterface {
  age: number
}

export interface funInterface {
  (name: string, age: number): void
}

export type testType = {
  name: string
}

export type extendsType = testType & { name: number, age: number }

export type extendsInterfaceType = testInterface & { age: number }

export type funType = (name: string, age: number) => void


export type stringTest = string
