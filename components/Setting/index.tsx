import Button from './components/SettingButton';
import Modal from './components/SettingModal';
import { SettingModalOpenProvider } from './context';

type Props = {
  children: React.ReactNode;
};

function Setting({ children }: Props) {
  return <SettingModalOpenProvider>{children}</SettingModalOpenProvider>;
}

Setting.Button = Button;
Setting.Modal = Modal;

export default Setting;
