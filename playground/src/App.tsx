import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import RichTextEditor, {
  Attachment,
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Excalidraw,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  Katex,
  Link,
  Mention,
  MoreMark,
  OrderedList,
  SlashCommand,
  Strike,
  Table,
  TableOfContents,
  TaskList,
  TextAlign,
  TextDirection,
  Underline,
  Video,
  locale,
} from 'reactjs-tiptap-editor'

import 'reactjs-tiptap-editor/style.css'
import 'katex/dist/katex.min.css'

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  TableOfContents,
  Heading.configure({ spacer: true }),
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  Video.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: 'dracula' }),
  ColumnActionButton,
  Table,
  Excalidraw,
  TextDirection,
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
]

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = new URLSearchParams(window?.location?.search)

  const initData = useMemo(() => queryParams.get('initialData'), [queryParams])
  const [content, setContent] = useState<string>('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onValueChange = useCallback(
    debounce((value: any) => {
      if (value !== '<p dir="auto"></p>') {
        setContent(value)
        if (window?.ReactNativeWebView) {
          window?.ReactNativeWebView.postMessage(
            JSON.stringify({ data: value }),
          )
        }
      }
    }, 300),
    [debounce],
  )

  useEffect(() => {
    locale.setLang('vi')
  }, [])

  return (
    <div style={{ background: 'white', height: '100vh' }}>
      <RichTextEditor
        output="html"
        removeDefaultWrapper
        content={content === '' ? initData : content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        bubbleMenu={{
          floatingMenuConfig: {
            hidden: true,
          },
        }}
        dark={false}
        hideToolbar={false}
      />
    </div>
  )
}

export default App
