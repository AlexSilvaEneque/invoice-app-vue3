import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars, faAngleDown, faPlus, faTrashCan, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(
    faBars,
    faAngleDown,
    faPlus,
    faTrashCan,
    faAngleRight,
    faAngleLeft
    )

const fontawesome = ['font-awesome-icon', FontAwesomeIcon]

export default fontawesome