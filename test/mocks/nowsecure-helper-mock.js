const MOCK_ACCESS_TOKEN = '1234567890ABCDEFGHIJK';
const MOCK_APPLICATION_IOS_PACKAGE = 'co.uk.mock';
const MOCK_APPLICATION_ANDROID_PACKAGE = 'uk.co.mock.android.play';
const MOCK_GROUP_ID = 'e1a73363-42c2-45e2-b6b1-8d148f9a773e';
const MOCK_IOS_ASSESSMENT_REPORT = [
  {
    ref: 'dfcb2000-019b-11eb-82e7-834e2d0bb87b',
    application: '1ba88b2c-fe49-11ea-80b5-0f629f803380',
    group: 'e1a73363-42c2-45e2-b6b1-8d148f9a773e',
    account: 'e1a73363-42c2-45e2-b6b1-8d148f9a773e',
    platform: 'ios',
    package: 'co.uk.camelot',
    task: 1601305455038,
    creator: '96a96116-952f-438e-a39a-2816990a1c90',
    created: '2020-09-28T15:04:15.111Z',
    updated: '2020-09-28T15:24:48.696Z',
    binary: 'd37a868f7dc764b996b09531cfe1ac652b550a7ac5f74c2960388313d89aa792',
    config: {
      static: {
        heartbleed_check: true,
        local_auth_check: true,
        change_cipher_spec_check: true,
        address_space_layout_rand_check: true,
        stack_smashing_protection_check: true,
        address_reference_counting_check: true
      },
      dynamic: {
        actions: {
          find: [
            'guest',
            'sign in',
            'sign_in',
            'sign-in',
            'login',
            'log in',
            'start',
            'signin',
            'continue',
            'submit',
            'sbmt',
            'OK',
            'yes',
            'agree',
            'accept',
            'next',
            'done',
            'already a',
            'skip',
            'signup',
            'register',
            'create',
            'get started',
            'sign_up',
            'sign up',
            'my account',
            'settings',
            'options',
            'apply',
            'Account',
            'dimiss'
          ],
          avoid: [
            'facebook',
            'G+',
            'Google plus',
            'Google',
            'GOOGLE',
            'twitter'
          ]
        },
        search_data: {
          adid: {
            value: 'DEADBEEF-1234-1234-1234-123456789ABC',
            search_strings: []
          },
          idfv: {
            value: 'CAFEBABE-1234-1234-1234-123456789ABC',
            search_strings: []
          },
          name: {
            value: 'Arthur Dent',
            is_sensitive: true,
            search_strings: [
              '/name',
              'name',
              'fullname',
              'full_name',
              'full name',
              'full-name'
            ]
          },
          email: {
            value: 'arthur.dent@nowsecure.com',
            is_sensitive: true,
            search_strings: [
              'display name',
              'displayname',
              'e mail',
              'e-mail',
              'e_mail',
              'email',
              'login',
              'screename',
              'user id',
              'user',
              'user-id',
              'user-name',
              'user_id',
              'user_name',
              'userid',
              'username'
            ]
          },
          zipcode: {
            value: '90210',
            is_sensitive: true,
            search_strings: [
              'zipcode',
              'zip',
              'zip_code',
              'zip-code',
              'zip code'
            ]
          },
          lastname: {
            value: 'Dent',
            is_sensitive: true,
            search_strings: [
              'Last name',
              'last name',
              'lastname',
              'last_name',
              'last-name'
            ]
          },
          password: {
            value: 'd0n7p4nic42',
            is_sensitive: true,
            search_strings: [
              'password',
              'pswd',
              'pass',
              'pwd',
              'pass_word'
            ]
          },
          username: {
            value: 'adent',
            is_sensitive: true,
            search_strings: [
              'username',
              'user_name',
              'userid',
              'login',
              'screename',
              'displayname',
              'display name',
              'usr',
              'uid',
              'nuid',
              'uname'
            ]
          },
          firstname: {
            value: 'Arthur',
            is_sensitive: true,
            search_strings: [
              'First name',
              'first name',
              'firstname',
              'first_name',
              'first-name'
            ]
          },
          gpsLatitude: {
            value: '42.0',
            search_strings: []
          },
          phonenumber: {
            value: '17068675309',
            is_sensitive: true,
            search_strings: [
              'Telephone number',
              'number',
              'phone Number',
              'phone num',
              'phone',
              'phonenumber',
              'tel'
            ]
          },
          gpsLongitude: {
            value: '41.0',
            search_strings: []
          }
        }
      }
    },
    status: {
      static: {
        id: '1601305455038.static',
        state: 'completed',
        modified: '2020-09-28T15:24:46.93899+00:00'
      },
      dynamic: {
        id: '10699200',
        state: 'completed',
        modified: '2020-09-28T15:24:46.969395+00:00'
      }
    },
    cancelled: false,
    task_status: 'completed',
    events: {
      dynamic: []
    },
    adjusted_issues: {
      cert: 0,
      geoip: 0,
      oslog: 0,
      sqlite: 0,
      network: 0,
      nscoding: 4.3,
      uses_http: 0,
      frameworks: 0,
      secure_drbg: 0,
      afnetworking: 0,
      entitlements: 0,
      ios_iv_reuse: 0,
      ios_keyboard: 4,
      ios_keychain: 0,
      ipa_metadata: 0,
      api_discovery: 0,
      crypto_methods: 0,
      ios_preferences: 0,
      ipa_dynamic_log: 0,
      background_modes: 0,
      heartbleed_check: 0,
      local_auth_check: 3.8,
      api_authentication: 0,
      jailbreak_detection: 0,
      leaked_asl_data_adid: 0,
      leaked_asl_data_idfv: 0,
      leaked_asl_data_name: 0,
      afnetworking_detected: 0,
      application_behaviors: 0,
      hostname_verification: 7,
      ipa_crypto_data_flows: 0,
      leaked_asl_data_email: 0,
      app_transport_security: 5.3,
      certificate_validation: 7,
      ipa_network_data_flows: 0,
      leaked_asl_data_custom: 0,
      ipa_sensitive_data_flow: 0,
      ipa_weak_crypto_methods: 3.7,
      leaked_asl_data_zipcode: 0,
      api_resource_consumption: 0,
      change_cipher_spec_check: 0,
      leaked_asl_data_lastname: 0,
      leaked_asl_data_password: 0,
      leaked_asl_data_username: 0,
      leaked_asl_data_firstname: 0,
      cookie_without_secure_flag: 5.3,
      api_excessive_data_exposure: 0,
      leaked_asl_data_gpsLatitude: 0,
      leaked_asl_data_phonenumber: 0,
      cookie_without_httponly_flag: 5.3,
      ipa_sensitive_data_http_adid: 0,
      ipa_sensitive_data_http_idfv: 0,
      leaked_asl_data_gpsLongitude: 0,
      leaked_asl_data_localWifiMAC: 0,
      api_resource_misconfiguration: 0,
      ipa_leaked_data_in_files_adid: 0,
      ipa_leaked_data_in_files_idfv: 0,
      ipa_leaked_data_in_files_name: 0,
      ipa_sensitive_data_http_email: 0,
      ipa_zip_file_in_transit_check: 0,
      ipa_leaked_data_in_files_email: 0,
      ipa_sensitive_data_http_custom: 0,
      ipa_sensitive_data_weak_crypto: 0,
      address_space_layout_rand_check: 0,
      ipa_leaked_data_in_files_custom: 0,
      ipa_sensitive_data_http_zipcode: 0,
      stack_smashing_protection_check: 0,
      address_reference_counting_check: 0,
      ipa_leaked_data_in_files_zipcode: 0,
      ipa_sensitive_data_http_lastname: 0,
      ipa_sensitive_data_http_password: 0,
      ipa_sensitive_data_http_username: 0,
      ipa_leaked_data_in_files_lastname: 0,
      ipa_leaked_data_in_files_password: 0,
      ipa_leaked_data_in_files_username: 0,
      ipa_sensitive_data_http_firstname: 0,
      ipa_sensitive_data_keychain_other: 0,
      ipa_leaked_data_in_files_firstname: 0,
      ipa_sensitive_data_cert_validation: 0,
      ipa_sensitive_data_http_deviceInfo: 0,
      ipa_sensitive_data_keychain_custom: 0,
      ipa_ats_exemptions_requiring_review: 5.3,
      ipa_sensitive_data_http_gpsLatitude: 0,
      ipa_sensitive_data_http_phonenumber: 0,
      ipa_zip_file_in_transit_check_https: 0,
      leaked_asl_data_surrounding_wifiMAC: 0,
      ipa_leaked_data_in_files_gpsLatitude: 0,
      ipa_leaked_data_in_files_phonenumber: 0,
      ipa_sensitive_data_http_gpsLongitude: 0,
      ipa_sensitive_data_http_localWifiMAC: 0,
      ipa_sensitive_data_keychain_password: 0,
      ipa_sensitive_data_keychain_username: 0,
      zip_file_in_transit_check_broken_ssl: 0,
      ipa_leaked_data_in_files_gpsLongitude: 0,
      ipa_leaked_data_in_files_localWifiMAC: 0,
      ipa_sensitive_data_http_surrounding_wifiMAC: 0,
      ipa_leaked_data_in_files_surrounding_wifiMAC: 0,
      ipa_improper_data_protection_entitlement_creds: 0
    },
    adjusted_score: 46.4,
    identified_vuln_map: {
      nscoding: 146218,
      ios_keyboard: 146219,
      local_auth_check: 146220,
      hostname_verification: 146221,
      app_transport_security: 146222,
      certificate_validation: 146223,
      ipa_weak_crypto_methods: 146224,
      cookie_without_secure_flag: 146225,
      cookie_without_httponly_flag: 146226,
      ipa_ats_exemptions_requiring_review: 146227
    }
  }
];

const MOCK_ANDROID_ASSESSMENT_REPORT = [
  {
    ref: '1c59fab0-fe49-11ea-b5be-b7e268fbde10',
    application: 'bdf2cc9a-fe48-11ea-80b5-f33f610fa80d',
    group: 'e1a73363-42c2-45e2-b6b1-8d148f9a773e',
    account: 'e1a73363-42c2-45e2-b6b1-8d148f9a773e',
    platform: 'android',
    package: 'uk.co.theofficialnationallotteryapp.android.play',
    task: 1600940054950,
    creator: '96a96116-952f-438e-a39a-2816990a1c90',
    created: '2020-09-24T09:34:14.994Z',
    updated: '2020-09-24T10:04:09.448Z',
    binary: 'efd365607b0feb1e66fd0bc0834f97b4a20dd268d133898df32b320480807bf7',
    config: {
      static: {
        urls_check: true,
        get_app_files: true,
        keysize_check: true,
        debug_flag_check: true,
        decode_apk_check: true,
        extract_lib_info: true,
        master_key_check: true,
        obfuscation_check: true,
        allow_backup_check: true,
        get_native_methods: true,
        decompile_apk_check: true,
        get_reflection_code: true,
        secure_random_check: true,
        certificate_validity_check: true,
        dynamic_code_loading_check: true,
        javascript_interface_check: true,
        application_overprivileged_check: true
      },
      dynamic: {
        actions: {
          find: [
            'guest',
            'sign in',
            'sign_in',
            'sign-in',
            'login',
            'log in',
            'start',
            'signin',
            'continue',
            'submit',
            'sbmt',
            'OK',
            'yes',
            'agree',
            'accept',
            'next',
            'done',
            'already a',
            'skip',
            'signup',
            'register',
            'create',
            'get started',
            'sign_up',
            'sign up',
            'my account',
            'settings',
            'options',
            'apply',
            'Account',
            'dimiss'
          ],
          avoid: [
            'facebook',
            'G+',
            'Google plus',
            'Google',
            'GOOGLE',
            'twitter'
          ]
        },
        search_data: {
          imei: {
            value: '358239051198804',
            is_sensitive: true,
            search_strings: [
              'IMEI',
              'DeviceIdentifier'
            ]
          },
          name: {
            value: 'Arthur Dent',
            is_sensitive: true,
            search_strings: [
              '/name',
              'name',
              'fullname',
              'full_name',
              'full name',
              'full-name'
            ]
          },
          email: {
            value: 'arthur.dent@nowsecure.com',
            is_sensitive: true,
            search_strings: [
              'display name',
              'displayname',
              'e mail',
              'e-mail',
              'e_mail',
              'email',
              'login',
              'screename',
              'user id',
              'user',
              'user-id',
              'user-name',
              'user_id',
              'user_name',
              'userid',
              'username'
            ]
          },
          zipcode: {
            value: '90210',
            is_sensitive: true,
            search_strings: [
              'zipcode',
              'zip',
              'zip_code',
              'zip-code',
              'zip code'
            ]
          },
          lastname: {
            value: 'Dent',
            is_sensitive: true,
            search_strings: [
              'Last name',
              'last name',
              'lastname',
              'last_name',
              'last-name'
            ]
          },
          password: {
            value: 'd0n7p4nic42',
            is_sensitive: true,
            search_strings: [
              'password',
              'pswd',
              'pass',
              'pwd',
              'pass_word'
            ]
          },
          username: {
            value: 'adent',
            is_sensitive: true,
            search_strings: [
              'username',
              'user_name',
              'userid',
              'login',
              'screename',
              'displayname',
              'display name',
              'usr',
              'uid',
              'nuid',
              'uname'
            ]
          },
          firstname: {
            value: 'Arthur',
            is_sensitive: true,
            search_strings: [
              'First name',
              'first name',
              'firstname',
              'first_name',
              'first-name'
            ]
          },
          gpsLatitude: {
            value: '98.8',
            is_sensitive: true,
            search_strings: []
          },
          phonenumber: {
            value: '17068675309',
            is_sensitive: true,
            search_strings: [
              'Telephone number',
              'number',
              'phone Number',
              'phone num',
              'phone',
              'phonenumber',
              'tel'
            ]
          },
          gpsLongitude: {
            value: '38.8',
            is_sensitive: true,
            search_strings: []
          },
          localWifiMAC: {
            value: '11:22:33:44:55:66',
            is_sensitive: true,
            search_strings: []
          },
          surrounding_wifiMAC: {
            value: '77:77:77:77:77:77',
            is_sensitive: true,
            search_strings: []
          }
        }
      }
    },
    status: {
      static: {
        id: '1600940054950.static',
        state: 'completed',
        modified: '2020-09-24T10:04:07.491632+00:00'
      },
      dynamic: {
        id: '10658602',
        state: 'completed',
        modified: '2020-09-24T10:03:11.38671+00:00'
      }
    },
    cancelled: false,
    task_status: 'completed',
    events: {
      dynamic: []
    },
    adjusted_issues: {
      okhttp: 0,
      apk_info: 0,
      uses_http: 0,
      apk_sqlite: 0,
      broken_ssl: 7,
      url_listing: 0,
      api_discovery: 0,
      apk_sqlcipher: 0,
      get_app_files: 0,
      keysize_check: 0,
      automation_info: 0,
      debug_flag_check: 4.4,
      decode_apk_check: 0,
      master_key_check: 0,
      sdcard_file_list: 0,
      behavioral_events: 0,
      obfuscation_check: 0,
      allow_backup_check: 4.6,
      api_authentication: 0,
      get_native_methods: 0,
      sms_communications: 0,
      decompile_apk_check: 0,
      get_reflection_code: 0,
      secure_random_check: 0,
      sensitive_data_flow: 0,
      snoop_network_hosts: 0,
      remote_code_execution: 0,
      leaked_logcat_data_MAC: 0,
      leaked_logcat_data_dns1: 0,
      leaked_logcat_data_dns2: 0,
      leaked_logcat_data_imei: 0,
      leaked_logcat_data_name: 0,
      runs_root_command_check: 0,
      sensitive_data_http_MAC: 0,
      api_resource_consumption: 0,
      leaked_data_in_files_MAC: 0,
      leaked_logcat_data_email: 0,
      sensitive_data_http_dns1: 0,
      sensitive_data_http_dns2: 0,
      sensitive_data_http_imei: 0,
      sensitive_data_http_name: 0,
      leaked_data_in_files_dns1: 0,
      leaked_data_in_files_dns2: 0,
      leaked_data_in_files_imei: 0,
      leaked_data_in_files_name: 0,
      leaked_logcat_data_custom: 0,
      leaked_logcat_data_serial: 0,
      sensitive_data_http_email: 0,
      zip_file_in_transit_check: 0,
      certificate_validity_check: 0,
      cookie_without_secure_flag: 0,
      dynamic_code_loading_check: 0,
      javascript_interface_check: 3.1,
      leaked_data_in_files_email: 0,
      leaked_logcat_data_wifi_ip: 0,
      leaked_logcat_data_zipcode: 0,
      sensitive_data_http_custom: 0,
      sensitive_data_http_serial: 0,
      world_readable_files_check: 0,
      world_writable_files_check: 0,
      api_excessive_data_exposure: 0,
      leaked_data_in_files_custom: 0,
      leaked_data_in_files_serial: 0,
      leaked_logcat_data_lastname: 0,
      leaked_logcat_data_password: 0,
      leaked_logcat_data_username: 0,
      leaked_logcat_data_wifi_mac: 0,
      sensitive_data_http_wifi_ip: 0,
      sensitive_data_http_zipcode: 0,
      sqlcipher_key_leakage_check: 0,
      cookie_without_httponly_flag: 0,
      leaked_data_in_files_wifi_ip: 0,
      leaked_data_in_files_zipcode: 0,
      leaked_logcat_data_firstname: 0,
      sensitive_data_http_lastname: 0,
      sensitive_data_http_password: 0,
      sensitive_data_http_username: 0,
      sensitive_data_http_wifi_mac: 0,
      api_resource_misconfiguration: 0,
      leaked_data_in_files_lastname: 0,
      leaked_data_in_files_password: 0,
      leaked_data_in_files_username: 0,
      leaked_data_in_files_wifi_mac: 0,
      leaked_logcat_data_android_id: 0,
      sensitive_data_http_firstname: 0,
      leaked_data_in_files_firstname: 0,
      leaked_logcat_data_gpsLatitude: 0,
      leaked_logcat_data_phonenumber: 0,
      sensitive_data_cert_validation: 0,
      sensitive_data_http_android_id: 0,
      leaked_data_in_files_android_id: 0,
      leaked_logcat_data_gpsLongitude: 0,
      leaked_logcat_data_localWifiMAC: 0,
      sensitive_data_http_gpsLatitude: 0,
      sensitive_data_http_phonenumber: 0,
      writable_executable_files_check: 0,
      zip_file_in_transit_check_https: 0,
      application_overprivileged_check: 0,
      leaked_data_in_files_gpsLatitude: 0,
      leaked_data_in_files_phonenumber: 0,
      leaked_logcat_data_bluetooth_mac: 0,
      sensitive_data_http_gpsLongitude: 0,
      sensitive_data_http_localWifiMAC: 0,
      arbitrary_code_execution_observed: 0,
      arbitrary_code_execution_probable: 0,
      leaked_data_in_files_gpsLongitude: 0,
      leaked_data_in_files_localWifiMAC: 0,
      sensitive_data_http_bluetooth_mac: 0,
      leaked_data_in_files_bluetooth_mac: 0,
      leaked_logcat_data_build_fingerprint: 2.1,
      zip_file_in_transit_check_broken_ssl: 0,
      leaked_logcat_data_provision_revision: 0,
      potential_sqlcipher_key_leakage_check: 0,
      sensitive_data_http_build_fingerprint: 0,
      leaked_data_in_files_build_fingerprint: 2.3,
      leaked_logcat_data_surrounding_wifiMAC: 0,
      sensitive_data_http_provision_revision: 0,
      leaked_data_in_files_provision_revision: 0,
      sensitive_data_http_surrounding_wifiMAC: 0,
      writable_executable_files_private_check: 0,
      leaked_data_in_files_surrounding_wifiMAC: 0,
      'leaked_logcat_data_Surrounding Wifi Network SSID': 0,
      'leaked_logcat_data_Surrounding Wifi Network BSSID': 0,
      'sensitive_data_http_Surrounding Wifi Network SSID': 0,
      'leaked_data_in_files_Surrounding Wifi Network SSID': 0,
      'sensitive_data_http_Surrounding Wifi Network BSSID': 0,
      'leaked_data_in_files_Surrounding Wifi Network BSSID': 0
    },
    adjusted_score: 48.4,
    identified_vuln_map: {
      broken_ssl: 144279,
      debug_flag_check: 144280,
      allow_backup_check: 144281,
      javascript_interface_check: 144282,
      leaked_logcat_data_build_fingerprint: 144283,
      leaked_data_in_files_build_fingerprint: 144284
    }
  }
];

module.exports = { MOCK_ACCESS_TOKEN, MOCK_APPLICATION_ANDROID_PACKAGE, MOCK_APPLICATION_IOS_PACKAGE, MOCK_IOS_ASSESSMENT_REPORT, MOCK_ANDROID_ASSESSMENT_REPORT, MOCK_GROUP_ID };
