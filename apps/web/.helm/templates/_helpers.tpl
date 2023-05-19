{{/*
Expand the name of the chart.
*/}}
{{- define "webServer.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "webServer.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "webServer.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "webServer.labels" -}}
helm.sh/chart: {{ include "webServer.chart" . }}
{{ include "webServer.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "webServer.selectorLabels" -}}
app.kubernetes.io/name: {{ include "webServer.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app: {{ include "webServer.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "webServer.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "webServer.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Service Annotations
*/}}
{{- define "webServer.serviceAnnotations" }}
service.beta.kubernetes.io/aws-load-balancer-type: nlb
service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
service.beta.kubernetes.io/aws-load-balancer-internal: 0.0.0.0/0
{{- end }}


{{/*
Service Annotations for external load balancing
*/}}
{{- define "webServer.serviceAnnotationsExternal" }}
service.beta.kubernetes.io/aws-load-balancer-type: nlb
service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
# service.beta.kubernetes.io/aws-load-balancer-ssl-cert: {{ .Values.certArn }}
{{- end }}

{{/*
Annotations for docker-desktop cluster mode
*/}}
{{- define "annotations.dockerDesktop" }}
hello: yes
{{- end }}

{{/*
Produce the absolute path of the repo
*/}}
{{- define "webServer.repoAbsPath" -}}
{{- printf "%s/%s" .Values.env.PROJECT_ROOT_ABSPATH .Values.env.REPO_RELPATH -}}
{{- end }}

{{/*
Produce the absolute path of the app
*/}}
{{- define "webServer.appAbsPath" -}}
{{- printf "%s/%s" .Values.env.PROJECT_ROOT_ABSPATH .Values.env.REPO_RELPATH -}}
{{- end }}

# {{/* 
# Produce the absolute path for the repo certificates
# */}}
# {{- define "webServer.certsPath" -}}
# {{ printf "%s/%s" (include "webServer.repoPath" .) .Values.env.CERTS_RELPATH }}
# {{- end }}

{{/* 
Produce path for a single certificate
*/}}
{{- define "webServer.singleCertPath" -}}
{{ printf "%s/%s" .global.Values.env.CERTIFICATES_ABSPATH .relpath }}
{{- end }}
