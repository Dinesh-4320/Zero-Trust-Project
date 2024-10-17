#Name
{{- define "admin.name" -}}
{{- default "admin" .Values.admin.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

#ChartName
{{- define "admin.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

#Common Labels
{{- define "admin.labels" -}}
helm.sh/chart: {{ include "admin.chart" . }}
{{ include "admin.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


#Selector labels
{{- define "admin.selectorLabels" -}}
app.kubernetes.io/name: {{ include "admin.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
