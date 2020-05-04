import Vue from 'vue'
import {
    Aside,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    Checkbox,
    CheckboxGroup,
    Col,
    Container,
    Divider,
    Form,
    FormItem,
    Header,
    InfiniteScroll,
    Input,
    Link,
    Main,
    Menu,
    MenuItem,
    Message,
    Option,
    Pagination,
    Progress,
    Radio,
    RadioButton,
    RadioGroup,
    Row,
    Select,
    Switch,
    Table,
    TableColumn,
    Tag,
    Timeline,
    TimelineItem,
    Transfer,
} from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Transfer)
Vue.use(Divider)
Vue.use(Link)
Vue.use(Switch)
Vue.use(ButtonGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(InfiniteScroll)
Vue.use(Tag)
Vue.use(RadioButton)

// 全局注册
Vue.prototype.$message = Message