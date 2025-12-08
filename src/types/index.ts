import type { FromSchema } from 'json-schema-to-ts'

import { act } from '@/schemas/act.schema.ts'
import { address } from '@/schemas/address.schema.ts'
import { administration } from '@/schemas/administration.schema.ts'
import { apartment } from '@/schemas/apartment.schema.ts'
import { appartmentInternalSystems } from '@/schemas/apartment-internal-systems.schema.ts'
import { buildingProperty } from '@/schemas/building-property.schema.ts'
import { constructionElements } from '@/schemas/construction-elements.schema.ts'
import { documentData } from '@/schemas/document-data.schema.ts'
import { heritage } from '@/schemas/heritage.schema.ts'
import { internalSystems } from '@/schemas/internal-systems.schema.ts'
import { organization } from '@/schemas/organization.schema.ts'
import { person } from '@/schemas/person.schema.ts'
import { rentInfo } from '@/schemas/rent-info.schema.ts'
import { territory } from '@/schemas/territory.schema.ts'
import { user } from '@/schemas/user.schema.ts'

export type Act = FromSchema<typeof act>
export type Address = FromSchema<typeof address>
export type Administration = FromSchema<typeof administration>
export type Apartment = FromSchema<typeof apartment>
export type AppartmentInternalSystems = FromSchema<typeof appartmentInternalSystems>
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
