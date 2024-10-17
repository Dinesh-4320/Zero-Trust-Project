helm uninstall zerotrust -n zta
kubectl delete namespace zta
helm install zerotrust . -n zta --create-namespace
kubectl get all -n zta