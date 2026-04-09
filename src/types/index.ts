import type { FromSchema } from 'json-schema-to-ts'

import type { act } from '@/schemas/act.schema.ts'
import type { address } from '@/schemas/address.schema.ts'
import type { administration } from '@/schemas/administration.schema.ts'
import type { apartmentInternalSystems } from '@/schemas/apartment-internal-systems.schema.ts'
import type { apartment } from '@/schemas/apartment.schema.ts'
import type { buildingProperty } from '@/schemas/building-property.schema.ts'
import type { constructionElements } from '@/schemas/construction-elements.schema.ts'
import type { documentData } from '@/schemas/document-data.schema.ts'
import type { heritage } from '@/schemas/heritage.schema.ts'
import type { internalSystems } from '@/schemas/internal-systems.schema.ts'
import type { organization } from '@/schemas/organization.schema.ts'
import type { person } from '@/schemas/person.schema.ts'
import type { rentInfo } from '@/schemas/rent-info.schema.ts'
import type { territory } from '@/schemas/territory.schema.ts'
import type { user } from '@/schemas/user.schema.ts'

export type Act = FromSchema<typeof act>
export type Address = FromSchema<typeof address>
export type Administration = FromSchema<typeof administration>
export type Apartment = FromSchema<typeof apartment>
export type ApartmentInternalSystems = FromSchema<typeof apartmentInternalSystems>
export type BuildingProperty = FromSchema<typeof buildingProperty>
export type ConstructionElements = FromSchema<typeof constructionElements>
export type DocumentData = FromSchema<typeof documentData>
export type Heritage = FromSchema<typeof heritage>
export type InternalSystems = FromSchema<typeof internalSystems>
export type Organization = FromSchema<typeof organization>
export type Person = FromSchema<typeof person>
export type RentInfo = FromSchema<typeof rentInfo>
export type Territory = FromSchema<typeof territory>
export type User = FromSchema<typeof user>
