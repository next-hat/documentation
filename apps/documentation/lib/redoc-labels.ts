import type { RedocRawOptions } from 'redoc'
import type { Locale } from './locales'
type Labels = NonNullable<RedocRawOptions['labels']>
const keys = ['enum', 'enumSingleValue', 'enumArray', 'default', 'deprecated', 'example', 'examples', 'recursive', 'arrayOf', 'webhook', 'const', 'noResultsFound', 'download', 'downloadSpecification', 'responses', 'callbackResponses', 'requestSamples', 'responseSamples'] as const
const values: Record<Locale, string[]> = {
  en: ['Enum', 'Value', 'Items', 'Default', 'Deprecated', 'Example', 'Examples', 'Recursive', 'Array of ', 'Event', 'Value', 'No results found', 'Download', 'Download OpenAPI specification', 'Responses', 'Callback responses', 'Request samples', 'Response samples'],
  fr: ['Valeurs possibles', 'Valeur', 'Éléments autorisés', 'Valeur par défaut', 'Obsolète', 'Exemple', 'Exemples', 'Récursif', 'Tableau de ', 'Webhook', 'Constante', 'Aucun résultat', 'Télécharger', 'Télécharger la spécification', 'Réponses', 'Réponses de rappel', 'Exemples de requête', 'Exemples de réponse'],
  ru: ['Допустимые значения', 'Значение', 'Допустимые элементы', 'По умолчанию', 'Устарело', 'Пример', 'Примеры', 'Рекурсивный', 'Массив ', 'Вебхук', 'Константа', 'Ничего не найдено', 'Скачать', 'Скачать спецификацию', 'Ответы', 'Ответы обратного вызова', 'Примеры запросов', 'Примеры ответов'],
  ja: ['列挙値', '値', '許可される要素', '既定値', '非推奨', '例', '例', '再帰', '配列の要素型 ', 'Webhook', '定数', '結果が見つかりません', 'ダウンロード', '仕様をダウンロード', 'レスポンス', 'コールバックのレスポンス', 'リクエストの例', 'レスポンスの例'],
  'zh-Hans': ['枚举值', '值', '允许的元素', '默认值', '已弃用', '示例', '示例', '递归', '数组元素类型 ', 'Webhook', '常量', '未找到结果', '下载', '下载规范', '响应', '回调响应', '请求示例', '响应示例']
}
export function redocLabels(locale: Locale): Labels {
  // Redoc merges labels into a module-level table. Reset every key even for English.
  return Object.fromEntries(keys.map((key, index) => [key, values[locale][index]]))
}
export const schemaLabels: Record<Locale, string> = { en: 'Schemas', fr: 'Schémas', ru: 'Схемы', ja: 'スキーマ', 'zh-Hans': '模式' }
