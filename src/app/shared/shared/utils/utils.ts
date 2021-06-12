export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const errorImage = (event, placeholder: string) => {
  event.target.src = placeholder
}

export const checkObjectLength = (obj): any [] =>{
  return Object?.keys(obj)
}
