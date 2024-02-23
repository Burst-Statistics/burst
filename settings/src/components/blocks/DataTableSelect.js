import * as Select from '@radix-ui/react-select';
import Icon from '../../utils/Icon';
import ProPill from './ProPill';
import useLicenseStore from '../../store/useLicenseStore';
// import './styles.css'; // Ensure your styles.css has the required styles

const DataTableSelect = ({ value, onChange, options }) => {
  const handleValueChange = (value) => {
    onChange(value);
  };
  const {licenseStatus} = useLicenseStore();
  const isProActive = burst_settings.is_pro && licenseStatus === 'valid';
  console.log('DataTableSelect options', options);

  return (
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger className="burst-datatable__select-trigger">
          <Select.Value placeholder="Select an option…" />
          <Select.Icon className={'burst-datatable__select-trigger__icon'}>
            <Icon name="chevron-down" />
          </Select.Icon>
        </Select.Trigger>
          <Select.Content className="burst-datatable__select-content" position={"popper"} alignOffset={-10}>
            <Select.Viewport>
              {options.map((option) => (
                  <Select.Item key={option.key} value={option.key} className="burst-datatable__select-content__item" disabled={option.pro && !burst_settings.is_pro}>
                    {value === option.key && <Icon name="bullet" color="var(--rsp-grey-400)" size={11} />}
                    {value !== option.key && <Icon name="circle" color="white" size={11} />}
                    <Select.ItemText className={'burst-datatable__select-content__label'}>{option.label}</Select.ItemText>
                    {option.pro && !isProActive && (
                        <ProPill/>
                    )}
                  </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
      </Select.Root>
  );
};

export default DataTableSelect;
