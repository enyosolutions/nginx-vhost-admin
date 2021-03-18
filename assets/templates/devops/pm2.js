module.exports = `

module.exports = {
  apps : [{
    name      : '{{name}}',
    script    : '{{ projectFolder }}/{{name}}/{{startupScript}}',
    combine_logs: true,
    merge_logs: true,
    error_file: '/var/log/apps/{{name}}.log',
    out_file: '/var/log/apps/{{name}}.log',
    env: {{ envVariables }},
  }]
};
`;
