# Security Policy

## Supported Versions

We take security seriously at WolfGuard. The following versions are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in the WolfGuard website, please follow these steps:

### 1. Do Not Publicly Disclose

Please do not open a public GitHub issue for security vulnerabilities. This helps prevent potential exploits while the issue is being resolved.

### 2. Contact Us Privately

Report security vulnerabilities via:

- **Email**: security@wolfguard.io
- **GitHub Security Advisory**: [Report Vulnerability](https://github.com/dantte-lp/wolfguard-site/security/advisories/new)

### 3. Provide Details

Include the following information in your report:

- **Description**: Clear description of the vulnerability
- **Impact**: Potential impact and severity
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Proof of Concept**: Code or screenshots demonstrating the vulnerability
- **Suggested Fix**: If you have ideas on how to fix it (optional)
- **Environment**: Browser, OS, and other relevant details

### 4. Response Timeline

You can expect:

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Timeline**: Varies based on severity
  - **Critical**: 1-3 days
  - **High**: 1-2 weeks
  - **Medium**: 2-4 weeks
  - **Low**: Best effort

### 5. Disclosure Process

1. We will confirm receipt of your report
2. We will investigate and validate the vulnerability
3. We will develop and test a fix
4. We will release the fix and publish a security advisory
5. We will credit you (if desired) in the security advisory

## Security Best Practices

### For Contributors

When contributing to this project:

1. **Never commit secrets**: API keys, passwords, tokens, etc.
2. **Use environment variables**: For sensitive configuration
3. **Follow secure coding practices**: Validate input, sanitize output
4. **Keep dependencies updated**: Regularly update npm packages
5. **Review security warnings**: Address npm audit findings
6. **Use HTTPS**: Always use secure connections
7. **Implement proper authentication**: If adding auth features
8. **Sanitize user input**: Prevent XSS and injection attacks

### For Deployers

When deploying the website:

1. **Use HTTPS**: Enable SSL/TLS with valid certificates
2. **Keep systems updated**: Regularly update OS and packages
3. **Use secure containers**: Run containers as non-root users
4. **Implement firewalls**: Restrict network access
5. **Enable security headers**: CSP, HSTS, X-Frame-Options, etc.
6. **Monitor logs**: Watch for suspicious activity
7. **Regular backups**: Maintain secure backups
8. **Access control**: Limit who can deploy and access servers

## Security Features

The WolfGuard website implements several security features:

### Content Security Policy (CSP)

Strict CSP headers to prevent XSS attacks:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
```

### HTTPS Enforcement

- Automatic HTTPS via Traefik and Let's Encrypt
- HSTS header to enforce HTTPS
- HTTP to HTTPS redirects

### Security Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Container Security

- Rootless containers (runs as uid 1001)
- Read-only root filesystem where possible
- Dropped Linux capabilities
- No privilege escalation (no-new-privileges flag)
- Minimal base images (Alpine Linux)

### Dependency Security

- Regular npm audit scans in CI/CD
- Automated dependency updates via Dependabot
- No dependencies with known high-severity vulnerabilities

## Vulnerability Disclosure Program

We appreciate security researchers who help keep our project secure:

### Scope

In scope:

- XSS vulnerabilities
- CSRF vulnerabilities
- Authentication/authorization issues
- Sensitive data exposure
- Security misconfigurations
- Dependency vulnerabilities

Out of scope:

- Social engineering attacks
- Physical attacks
- Denial of Service (DoS) attacks
- Issues in third-party dependencies (report to them directly)

### Rewards

While we don't offer monetary rewards at this time, we will:

- Credit you in our security advisories (if desired)
- Thank you publicly (if desired)
- Provide a detailed response about the fix

### Safe Harbor

We consider security research conducted in accordance with this policy to be:

- Authorized under the Computer Fraud and Abuse Act (CFAA)
- Exempt from DMCA anti-circumvention provisions
- Lawful and helpful to improve our security

We will not take legal action against you if you:

- Make a good faith effort to avoid privacy violations, data destruction, and service interruption
- Only interact with accounts you own or have explicit permission to access
- Don't exploit the vulnerability beyond what's necessary to demonstrate it
- Report the vulnerability promptly
- Keep vulnerability details confidential until we've addressed it

## Security Audit

### Last Security Audit

- **Date**: 2025-10-31
- **Auditor**: Internal team
- **Findings**: No critical vulnerabilities
- **Status**: All findings addressed

### Automated Scans

We run automated security scans:

- **npm audit**: On every CI build
- **GitHub Security Scanning**: Continuous
- **Dependabot Alerts**: Automatic

## Compliance

### Data Protection

The WolfGuard website:

- Does not collect personal data without consent
- Does not use tracking cookies
- Complies with GDPR requirements
- Has a clear privacy policy

### License Compliance

- All dependencies are properly licensed
- GPL-3.0 license for the website code
- No proprietary or restrictive licenses

## Security Updates

Subscribe to security updates:

- **GitHub Watch**: Watch the repository for security advisories
- **GitHub Security Advisories**: [View advisories](https://github.com/dantte-lp/wolfguard-site/security/advisories)
- **Release Notes**: Check release notes for security fixes

## Contact

For security concerns:

- **Email**: security@wolfguard.io
- **GitHub**: [Security Advisories](https://github.com/dantte-lp/wolfguard-site/security/advisories)

For general questions:

- **GitHub Issues**: [Open an issue](https://github.com/dantte-lp/wolfguard-site/issues)
- **Documentation**: https://docs.wolfguard.io

## Acknowledgments

We thank the following security researchers for responsibly disclosing vulnerabilities:

(None yet - be the first!)

---

Thank you for helping keep WolfGuard secure!
