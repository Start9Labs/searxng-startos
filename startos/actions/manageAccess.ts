import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { uiUsername } from '../utils'

const { InputSpec, Value, Variants } = sdk

const randomPassword = { charset: 'a-z,A-Z,0-9', len: 32 }

export const inputSpec = InputSpec.of({
  access: Value.union({
    name: i18n('Access'),
    description: i18n(
      'Choose who can use your SearXNG instance. Public: anyone with the address can use it. Private: require a username and password to log in.',
    ),
    default: 'public',
    variants: Variants.of({
      public: { name: i18n('Public'), spec: InputSpec.of({}) },
      private: {
        name: i18n('Private (require login)'),
        spec: InputSpec.of({
          password: Value.text({
            name: i18n('Password'),
            description: i18n(
              'The password for logging in as "admin". Use the generate button for a strong random password, or type your own.',
            ),
            required: true,
            masked: true,
            default: randomPassword,
            generate: randomPassword,
          }),
        }),
      },
    }),
  }),
})

export const manageAccess = sdk.Action.withInput(
  // id
  'manage-access',

  // metadata
  async ({ effects }) => ({
    name: i18n('Manage Access'),
    description: i18n(
      'Make your SearXNG instance public, or require a username and password to use it. The username is always "admin"; you set the password. This protects both the Web UI and the Stats Dashboard.',
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
    const password = await storeJson.read((s) => s?.uiPassword).once()
    return {
      access: password
        ? { selection: 'private' as const, value: { password } }
        : { selection: 'public' as const, value: {} },
    }
  },

  // execution
  async ({ effects, input }) => {
    if (input.access.selection === 'private') {
      const { password } = input.access.value
      await storeJson.merge(effects, { uiPassword: password })
      return {
        version: '1',
        title: 'Login Required',
        message:
          'Your SearXNG instance now requires a login. Use these credentials in your browser; they also cover the Stats Dashboard.',
        result: {
          type: 'group',
          value: [
            {
              type: 'single',
              name: 'Username',
              description: null,
              value: uiUsername,
              masked: false,
              copyable: true,
              qr: false,
            },
            {
              type: 'single',
              name: 'Password',
              description: null,
              value: password,
              masked: true,
              copyable: true,
              qr: false,
            },
          ],
        },
      }
    }

    await storeJson.merge(effects, { uiPassword: undefined })
    return {
      version: '1',
      title: 'Now Public',
      message:
        'Your SearXNG instance is now public — anyone with the address can use it.',
      result: null,
    }
  },
)
