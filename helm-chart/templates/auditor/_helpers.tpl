#Name
{{- define "auditor.name" -}}
{{- default "auditor" .Values.auditor.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

#ChartName
{{- define "auditor.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

#Common Labels
{{- define "auditor.labels" -}}
helm.sh/chart: {{ include "auditor.chart" . }}
{{ include "auditor.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


#Selector labels
{{- define "auditor.selectorLabels" -}}
app.kubernetes.io/name: {{ include "auditor.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
