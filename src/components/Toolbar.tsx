import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { Editor } from '@tiptap/core'

import { Separator } from '@/components'
import { useLocale } from '@/locales'
import { isFunction } from '@/utils/utils'

export interface ToolbarProps {
  editor: Editor
  disabled?: boolean
}

interface ToolbarItemProps {
  button: {
    component: React.ComponentType<any>
    componentProps: Record<string, any>
  }
  divider: boolean
  spacer: boolean
}

const elementHeight = 50

function Toolbar({ editor, disabled }: ToolbarProps) {
  const { t } = useLocale()

  // const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [top, setTop] = useState(0)

  const handleResize = useCallback(() => {
    // setKeyboardVisible(window.innerHeight < 500)
    const viewportHeight = window.visualViewport?.height ?? 0
    // math
    setTop(viewportHeight + window.scrollY - elementHeight)
  }, [])

  useEffect(() => {
    window.visualViewport?.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const items = useMemo(() => {
    const extensions = [...editor.extensionManager.extensions]
    const sortExtensions = extensions.sort((arr, acc) => {
      const a = (arr.options).sort ?? -1
      const b = (acc.options).sort ?? -1
      return a - b
    })

    let menus: ToolbarItemProps[] = []

    for (const extension of sortExtensions) {
      const { button, divider = false, spacer = false, toolbar = true } = extension.options as any
      if (!button || !isFunction(button) || !toolbar) {
        continue
      }

      const _button: ToolbarItemProps['button'] | ToolbarItemProps['button'][] = button({
        editor,
        extension,
        t,
      })

      if (Array.isArray(_button)) {
        const menu: ToolbarItemProps[] = _button.map((k, i) => ({
          button: k,
          divider: i === _button.length - 1 ? divider : false,
          spacer: i === 0 ? spacer : false,
        }))
        menus = [...menus, ...menu]
        continue
      }

      menus.push({ button: _button, divider, spacer })
    }
    return menus
  }, [editor, t])

  console.log('top', top)

  return (
    <div
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1,
        position: 'fixed',
        height: 50,
        // bottom: isKeyboardVisible ? top : 100,
        width: '100%',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        msOverflowX: 'hidden',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 16,
        transform: `translateY(${top}px)`,
      }}
    >
      <div className="richtext-flex richtext-gap-x-1">
        {items.map((item: ToolbarItemProps, key) => {
          const ButtonComponent = item.button.component

          return (
            <div className="richtext-flex richtext-items-center" key={`toolbar-item-${key}`}>
              {item?.spacer && <Separator orientation="vertical" className="!richtext-h-[16px] !richtext-mx-[10px]" />}

              <ButtonComponent
                {...item.button.componentProps}
                disabled={disabled || item?.button?.componentProps?.disabled}
              />

              {item?.divider && <Separator orientation="vertical" className="!richtext-h-auto !richtext-mx-2" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Toolbar }
