# Orange BE Flybox

Orange BE Flybox PHP client

# Usage

Bash:
```bash
php cmd.php ADMIN_PASSWORD /device/information
php cmd.php ADMIN_PASSWORD /wlan/host-list
php cmd.php ADMIN_PASSWORD /sms/sms-list '<?xml version="1.0" encoding="UTF-8"?><request><PageIndex>1</PageIndex><ReadCount>20</ReadCount><BoxType>1</BoxType><SortType>0</SortType><Ascending>0</Ascending><UnreadPreferred>0</UnreadPreferred></request>'
```

PHP:
```php
$flybox = new Flybox('ADMIN_PASSWORD');
print_r($flybox->get_info());
print_r($flybox->get_hosts());
print_r($flybox->get_smses());
```
