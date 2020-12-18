const registry: any = {
  fields: {},
  formComponent: 'form',
}

export const getRegistry = () => {
  return {
    fields: registry.fields,
    formComponent: registry.formComponent,
  }
}

export const cleanRegistry = () => {
  registry.fields = {}
}

export const registFormFields = (fields: any) => {
  Object.keys(fields).forEach(key => {
    if (!registry.fields[key]) {
      registry.fields[key] = fields[key];
    }
  })
}