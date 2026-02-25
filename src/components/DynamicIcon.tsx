'use client';
// Static icon map — only imports icons actually used in content files (avoids 800kB wildcard import)
import { SvgIconProps } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppsIcon from '@mui/icons-material/Apps';
import ArchiveIcon from '@mui/icons-material/Archive';
import ArticleIcon from '@mui/icons-material/Article';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BackupIcon from '@mui/icons-material/Backup';
import BlockIcon from '@mui/icons-material/Block';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CodeIcon from '@mui/icons-material/Code';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import FilterListIcon from '@mui/icons-material/FilterList';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ForwardIcon from '@mui/icons-material/Forward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyIcon from '@mui/icons-material/Key';
import LanguageIcon from '@mui/icons-material/Language';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MonitorIcon from '@mui/icons-material/Monitor';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RouterIcon from '@mui/icons-material/Router';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TableChartIcon from '@mui/icons-material/TableChart';
import TerminalIcon from '@mui/icons-material/Terminal';
import UploadIcon from '@mui/icons-material/Upload';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const iconMap: Record<string, React.ElementType> = {
    AddCircleOutline: AddCircleOutlineIcon,
    Apps: AppsIcon,
    Archive: ArchiveIcon,
    Article: ArticleIcon,
    AutoFixHigh: AutoFixHighIcon,
    Backup: BackupIcon,
    Block: BlockIcon,
    Cloud: CloudIcon,
    CloudQueue: CloudQueueIcon,
    Code: CodeIcon,
    DnsOutlined: DnsOutlinedIcon,
    Edit: EditIcon,
    Email: EmailIcon,
    EventRepeat: EventRepeatIcon,
    FilterList: FilterListIcon,
    FolderOpen: FolderOpenIcon,
    Forward: ForwardIcon,
    ImportExport: ImportExportIcon,
    Inbox: InboxIcon,
    Key: KeyIcon,
    Language: LanguageIcon,
    ListAlt: ListAltIcon,
    Lock: LockIcon,
    MailOutline: MailOutlineIcon,
    ManageAccounts: ManageAccountsIcon,
    Monitor: MonitorIcon,
    RestoreFromTrash: RestoreFromTrashIcon,
    RocketLaunch: RocketLaunchIcon,
    Router: RouterIcon,
    Schedule: ScheduleIcon,
    Search: SearchIcon,
    Security: SecurityIcon,
    Settings: SettingsIcon,
    SettingsEthernet: SettingsEthernetIcon,
    Shield: ShieldIcon,
    Speed: SpeedIcon,
    Storage: StorageIcon,
    SwapHoriz: SwapHorizIcon,
    TableChart: TableChartIcon,
    Terminal: TerminalIcon,
    Upload: UploadIcon,
    Verified: VerifiedIcon,
    VerifiedUser: VerifiedUserIcon,
    VpnKey: VpnKeyIcon,
};

interface DynamicIconProps extends SvgIconProps {
    name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
    const IconComponent = iconMap[name] ?? HelpOutlineIcon;
    return <IconComponent {...props} />;
}
