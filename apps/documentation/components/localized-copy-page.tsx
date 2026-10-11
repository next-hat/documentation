'use client'

import { Button, Select } from 'nextra/components'
import { useCopy } from 'nextra/hooks'
import { ArrowRightIcon, ChatGPTIcon, ClaudeIcon, CopyIcon, LinkArrowIcon } from 'nextra/icons'
import { useConfig, useThemeConfig } from 'nextra-theme-docs'
import type { Locale } from '@/lib/locales'

const labels = {
  fr: {
    copy: 'Copier la page', copied: 'Copié', markdown: 'Copier la page en Markdown pour les LLM',
    chatgpt: 'Ouvrir dans ChatGPT', claude: 'Ouvrir dans Claude', ask: 'Poser des questions sur cette page',
    query: (url: string) => `Lis ${url} pour que je puisse poser des questions à son sujet.`
  },
  ru: {
    copy: 'Копировать страницу', copied: 'Скопировано', markdown: 'Копировать страницу в Markdown для языковых моделей',
    chatgpt: 'Открыть в ChatGPT', claude: 'Открыть в Claude', ask: 'Задать вопросы об этой странице',
    query: (url: string) => `Прочитай ${url}, чтобы я мог задавать вопросы об этой странице.`
  },
  ja: {
    copy: 'ページをコピー', copied: 'コピーしました', markdown: 'LLM向けにページをMarkdownでコピー',
    chatgpt: 'ChatGPTで開く', claude: 'Claudeで開く', ask: 'このページについて質問する',
    query: (url: string) => `${url}を読んで、このページについて質問できるようにしてください。`
  },
  'zh-Hans': {
    copy: '复制页面', copied: '已复制', markdown: '将页面复制为供大语言模型使用的 Markdown',
    chatgpt: '在 ChatGPT 中打开', claude: '在 Claude 中打开', ask: '询问此页面的内容',
    query: (url: string) => `请阅读 ${url}，以便我就此页面提问。`
  }
}

function Item({ icon: Icon, title, description, isExternal }: {
  icon: typeof CopyIcon; title: string; description: string; isExternal?: boolean
}) {
  return <div className="x:flex x:gap-3 x:items-center">
    <Icon width="16" />
    <div className="x:flex x:flex-col">
      <span className="x:font-medium x:flex x:gap-1">{title}{isExternal && <LinkArrowIcon height="1em" />}</span>
      <span className="x:text-xs">{description}</span>
    </div>
  </div>
}

export function LocalizedCopyPage({ sourceCode, locale }: { sourceCode: string; locale: Exclude<Locale, 'en'> }) {
  const { copy, isCopied } = useCopy()
  const { activeThemeContext } = useConfig().normalizePagesResult
  const themeConfig = useThemeConfig()
  const text = labels[locale]
  if (!themeConfig.copyPageButton || !activeThemeContext.copyPage || !sourceCode) return null

  function handleCopy() { copy(sourceCode) }

  return <div className="x:border x:inline-flex x:rounded-md x:items-stretch nextra-border x:float-end x:overflow-hidden">
    <Button className={({ hover }) => [
      'x:ps-2 x:pe-1 x:flex x:gap-2 x:text-sm x:font-medium x:items-center',
      isCopied && 'x:opacity-70',
      hover && 'x:bg-gray-200 x:text-gray-900 x:dark:bg-primary-100/5 x:dark:text-gray-50'
    ].filter(Boolean).join(' ')} onClick={handleCopy}>
      <CopyIcon width="16" />
      {isCopied ? text.copied : text.copy}
    </Button>
    <Select anchor={{ to: 'bottom end', gap: 10 }} className="x:rounded-none" options={[
      { id: 'copy', name: <Item icon={CopyIcon} title={text.copy} description={text.markdown} /> },
      { id: 'chatgpt', name: <Item icon={ChatGPTIcon} title={text.chatgpt} description={text.ask} isExternal /> },
      { id: 'claude', name: <Item icon={ClaudeIcon} title={text.claude} description={text.ask} isExternal /> }
    ]} value="" selectedOption={<ArrowRightIcon width="12" className="x:rotate-90" />} onChange={value => {
      if (value === 'copy') { handleCopy(); return }
      const url = value === 'chatgpt' ? 'chatgpt.com/?hints=search&prompt' : 'claude.ai/new?q'
      window.open(`https://${url}=${encodeURIComponent(text.query(location.href))}`, '_blank')
    }} />
  </div>
}
