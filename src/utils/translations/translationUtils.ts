
import languages from './languages'

export interface ILocalesLookupItem {
    abbreviation: string
    title: string
    words: { [x: string]: string }
  }
  
  const localesLookup: ILocalesLookupItem[] = [
    {
      abbreviation: 'en',
      title: 'English',
      words: languages.en,
    },
    {
      abbreviation: 'es',
      title: 'Spanish',
      words: languages.es,
    },
  ]

const isFunction = (functionToCheck: any) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

const find = (arr: any | undefined | null, callback: any) => {
    const targetArray: any[] = Array.isArray(arr) ? arr : Object.values(arr)
    if (targetArray) {
      if (isFunction(callback)) {
        return targetArray.find(callback)
      }
      return targetArray.find((item: any) => {
        let isOkay: boolean = true
        for (const key in callback) {
          if (callback[key]) {
            if (item[key] !== callback[key]) {
              isOkay = false
            }
          }
        }
        return isOkay
      })
    }
    return undefined
}

const getTranslation = (word: string, locale: string): string => {
    const targetLookup: ILocalesLookupItem | undefined = find(localesLookup, { abbreviation: locale })
    if (targetLookup && targetLookup.words[word]) {
      return targetLookup.words[word]
    }
    return word
}
  
export default getTranslation
  