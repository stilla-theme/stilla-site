lua << EOF
package.loaded['stilla'] = nil
package.loaded['stilla.util'] = nil
package.loaded['stilla.colors'] = nil
package.loaded['stilla.theme'] = nil
package.loaded['stilla.functions'] = nil

require('stilla').set()
EOF
