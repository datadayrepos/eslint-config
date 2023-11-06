import { packages } from '@eslint-stylistic/metadata'
import fs from 'node:fs/promises'

const rules = packages.filter(i => i.shortId !== 'default').flatMap(i => i.rules)

const dts = `import type {
  EslintRules,
  MergeIntersection,
  ReactRules,
  TypeScriptRules,
  Unprefix,
} from '@datadayrepos/eslint-define-config'

type MergedRules = MergeIntersection<
  EslintRules &
  Unprefix<ReactRules, 'react/'> &
  Unprefix<TypeScriptRules, '@typescript-eslint/'>
>

export type StylisticRules = Pick<MergedRules, ${rules.map(i => `'${i.name}'`).join(' | ')}>
`

fs.writeFile('src/generated/stylistic.ts', dts, 'utf-8')
