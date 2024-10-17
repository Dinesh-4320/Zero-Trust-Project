helm install falco \
     --create-namespace \
     -n falco \
     --version 4.0.0 \
     --set collectors.kubernetes.enabled=true \
     --set driver.kind=modern_ebpf \
     --set tty=true \
     --set collectors.containerd.enabled=true \
     --set collectors.containerd.socket=/run/containerd/containerd.sock \
     -f values.yaml \
     -f custom-rules.yaml \
     falcosecurity/falco