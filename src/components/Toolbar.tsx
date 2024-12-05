/* eslint-disable no-console */
import React, { useCallback, useMemo } from 'react'
import type { Editor } from '@tiptap/core'

import { Separator } from '@/components'
import { useLocale } from '@/locales'
import { isFunction } from '@/utils/utils'
import useKeyboardVisibility from '@/hooks/useKeyboardVisibility'

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

function Toolbar({ editor, disabled }: ToolbarProps) {
  const { t } = useLocale()
  const { isKeyboardVisible } = useKeyboardVisibility()
  const itemToolBars = useMemo(
    () => [
      'Undo2',
      'Redo2',
      'Bold',
      'Italic',
      'Type',
      'KatexIcon',
      'List',
      'ListOrdered',
      'Code2',
      'Attachment',
      'ImageUp',
      'Video',
    ],
    [],
  )

  const disableToolBars = useMemo(
    () => [
      'Undo2',
      'Redo2',
      'Bold',
      'Italic',
      'Type',
      'KatexIcon',
      'List',
      'ListOrdered',
      'Code2',
    ],
    [],
  )

  const items = useMemo(() => {
    const extensions = [...editor.extensionManager.extensions]
    const sortExtensions = extensions.sort((arr, acc) => {
      const a = arr.options.sort ?? -1
      const b = acc.options.sort ?? -1
      return a - b
    })

    let menus: ToolbarItemProps[] = []

    for (const extension of sortExtensions) {
      const {
        button,
        divider = false,
        spacer = false,
        toolbar = true,
      } = extension.options as any
      if (!button || !isFunction(button) || !toolbar) {
        continue
      }

      const _button: ToolbarItemProps['button'] | ToolbarItemProps['button'][]
        = button({
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

  const newItems: ToolbarItemProps[] = useMemo(
    () =>
      items.filter(item =>
        itemToolBars.includes(item.button.componentProps?.icon),
      ),
    [items, itemToolBars],
  )

  const handleToolbarClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1,
        position: 'fixed',
        height: 50,
        bottom: isKeyboardVisible ? 0 : 0,
        width: '100%',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        msOverflowX: 'hidden',
        background: '#F6F6F8',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="richtext-flex richtext-gap-x-1">
        {newItems.map((item: ToolbarItemProps, key) => {
          if (itemToolBars.includes(item.button.componentProps?.icon)) {
            const ButtonComponent = item.button.component

            console.log(
              'item.button.componentProps?.icon',
              item.button.componentProps?.icon,
            )

            return (
              <div
                onClick={(e) => {
                  if (
                    disableToolBars.includes(item.button.componentProps?.icon)
                  ) {
                    handleToolbarClick(e)
                  }
                }}
                onMouseDown={(e) => {
                  if (
                    disableToolBars.includes(item.button.componentProps?.icon)
                  ) {
                    handleToolbarClick(e)
                  }
                }}
                className="richtext-flex richtext-items-center"
                key={`toolbar-item-${key}`}
              >
                {item?.spacer && (
                  <Separator
                    orientation="vertical"
                    className="!richtext-h-[16px] !richtext-mx-[10px]"
                  />
                )}

                <ButtonComponent
                  {...item.button.componentProps}
                  disabled={disabled || item?.button?.componentProps?.disabled}
                />

                {item?.divider && (
                  <Separator
                    orientation="vertical"
                    className="!richtext-h-auto !richtext-mx-2"
                  />
                )}
              </div>
            )
          }
          return <React.Fragment key={`toolbar-item-${key}`}></React.Fragment>
        })}
      </div>
    </div>
  )
}

export { Toolbar }
