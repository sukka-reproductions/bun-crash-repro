const RESERVED_IPV4_CIDR = [
  '0.0.0.0/8',
  '10.0.0.0/8',
  '100.64.0.0/10',
  '127.0.0.0/8',
  '169.254.0.0/16',
  '172.16.0.0/12',
  '192.0.0.0/24',
  '192.0.2.0/24',
  '192.168.0.0/16',
  '198.18.0.0/15',
  '198.51.100.0/24',
  '203.0.113.0/24',
  '224.0.0.0/4',
  '233.252.0.0/24',
  '240.0.0.0/4'
];

export const foo = async () => {
  const [{ exclude }, cidr] = await Promise.all([
    import('cidr-tools-wasm'),
    fetch('https://raw.githubusercontent.com/misakaio/chnroutes2/master/chnroutes.txt').then(r => r.text())
  ]);

  const reversedCidr = exclude(
    [
      '0.0.0.0/0',
      // https://github.com/misakaio/chnroutes2/issues/25
      '223.118.0.0/15',
      '223.120.0.0/15'
    ],
    RESERVED_IPV4_CIDR.concat(cidr.split('\n').filter(line => line.includes('/'))),
    true
  );

  return reversedCidr;
};

if (import.meta.main) {
  foo();
}
