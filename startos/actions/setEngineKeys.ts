import { EngineEntry, settingsYaml } from '../fileModels/settings.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value, List } = sdk

export const inputSpec = InputSpec.of({
  engines: Value.list(
    List.obj(
      {
        name: i18n('Engine API Keys'),
        description: i18n(
          'Configure API keys for paid SearXNG engines. Removing an entry reverts the engine to its upstream default.',
        ),
      },
      {
        displayAs: '{{name}}',
        uniqueBy: 'name',
        spec: InputSpec.of({
          name: Value.text({
            name: i18n('Engine ID'),
            description: i18n(
              'The SearXNG engine module name (e.g. "kagi"). Must match a real engine module.',
            ),
            required: true,
            default: null,
            masked: false,
            placeholder: 'braveapi',
          }),
          api_key: Value.text({
            name: i18n('API Key'),
            required: true,
            default: null,
            masked: true,
          }),
        }),
      },
    ),
  ),
})

export const setEngineKeys = sdk.Action.withInput(
  // id
  'set-engine-keys',

  // metadata
  async ({ effects }) => ({
    name: i18n('Engine API Keys'),
    description: i18n(
      'Configure API keys for paid SearXNG engines. Removing an entry reverts the engine to its upstream default.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // input spec
  inputSpec,

  // pre-fill
  async ({ effects }) => {
    const existing = (await settingsYaml.read((y) => y.engines).once()) ?? []
    return {
      engines: existing
        .filter((e): e is EngineEntry & { api_key: string } => !!e.api_key)
        .map((e) => ({ name: e.name, api_key: e.api_key })),
    }
  },

  // execution
  async ({ effects, input }) => {
    await settingsYaml.merge(effects, {
      engines: input.engines.map(({ name, api_key }) => {
        const trimmed = name.trim()
        return {
          name: trimmed,
          engine: trimmed,
          api_key,
          inactive: false,
          disabled: false,
        }
      }),
    })
  },
)
